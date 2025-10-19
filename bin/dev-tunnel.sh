#!/bin/bash

# Development script with auto-rebuild and tunnel
# This script runs build in production mode with watch, then starts the tunnel

set -e

echo "🚀 Starting development with Cloudflare Tunnel..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Build production (initial build)
echo -e "\n${BLUE}📦 Building production bundle...${NC}"
pnpm build

# Step 2: Check if cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
    echo -e "${YELLOW}⚠️  'cloudflared' not found.${NC}"
    echo -e "${YELLOW}Please install it first:${NC}"
    echo -e "${YELLOW}  macOS: brew install cloudflare/cloudflare/cloudflared${NC}"
    exit 1
fi

# Step 3: Kill any existing serve process on port 3000
echo -e "\n${BLUE}🧹 Cleaning up existing processes...${NC}"
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Step 4: Start serve in background with CORS enabled
echo -e "\n${BLUE}🌐 Starting local server on port 3000...${NC}"
serve dist -p 3000 --cors > /dev/null 2>&1 &
SERVE_PID=$!
echo -e "${GREEN}✓ Server started (PID: $SERVE_PID)${NC}"

# Wait a bit for serve to start
sleep 2

# Step 5: Start file watcher in background
echo -e "\n${BLUE}👀 Starting file watcher...${NC}"
{
    # Watch for changes in src/ and transcribe.srt
    fswatch -o src/ transcribe.srt | while read -r event; do
        echo -e "\n${YELLOW}📝 Files changed, rebuilding...${NC}"
        pnpm build
        echo -e "${GREEN}✓ Rebuild complete${NC}"
    done
} &
WATCHER_PID=$!
echo -e "${GREEN}✓ File watcher started (PID: $WATCHER_PID)${NC}"

# Step 6: Start cloudflared tunnel
echo -e "\n${BLUE}☁️  Starting Cloudflare Tunnel...${NC}"
echo -e "${GREEN}✓ Tunnel URL: https://reinocast.reinocapital.com.br${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop everything${NC}\n"

# Trap to cleanup on exit
cleanup() {
    echo -e "\n\n${BLUE}🧹 Cleaning up...${NC}"
    kill $SERVE_PID 2>/dev/null || true
    kill $WATCHER_PID 2>/dev/null || true
    echo -e "${GREEN}✓ All processes stopped${NC}"
    exit 0
}
trap cleanup INT TERM

# Start tunnel with config file
cloudflared tunnel --config cloudflared-config.yml run reinocast

# This line will only be reached if cloudflared exits
cleanup

