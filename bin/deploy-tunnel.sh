#!/bin/bash

# Deploy script for Cloudflare Tunnel
# This script builds the project and creates a tunnel to serve it

set -e

echo "🚀 Starting deployment process..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Build production
echo -e "\n${BLUE}📦 Building production bundle...${NC}"
pnpm build

# Step 2: Check if serve is installed
if ! command -v serve &> /dev/null; then
    echo -e "${YELLOW}⚠️  'serve' not found. Installing globally...${NC}"
    npm install -g serve
fi

# Step 3: Check if cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
    echo -e "${YELLOW}⚠️  'cloudflared' not found.${NC}"
    echo -e "${YELLOW}Please install it first:${NC}"
    echo -e "${YELLOW}  macOS: brew install cloudflare/cloudflare/cloudflared${NC}"
    echo -e "${YELLOW}  Or visit: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/${NC}"
    exit 1
fi

# Step 4: Kill any existing serve process on port 3000
echo -e "\n${BLUE}🧹 Cleaning up existing processes...${NC}"
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Step 5: Start serve in background
echo -e "\n${BLUE}🌐 Starting local server on port 3000...${NC}"
serve dist -p 3000 > /dev/null 2>&1 &
SERVE_PID=$!
echo -e "${GREEN}✓ Server started (PID: $SERVE_PID)${NC}"

# Wait a bit for serve to start
sleep 2

# Step 6: Start cloudflared tunnel
echo -e "\n${BLUE}☁️  Starting Cloudflare Tunnel...${NC}"
echo -e "${GREEN}✓ Tunnel URL: https://reinocast.reinocapital.com.br${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the tunnel${NC}\n"

# Trap to cleanup on exit
cleanup() {
    echo -e "\n\n${BLUE}🧹 Cleaning up...${NC}"
    kill $SERVE_PID 2>/dev/null || true
    echo -e "${GREEN}✓ Deployment stopped${NC}"
    exit 0
}
trap cleanup INT TERM

# Start tunnel with config file
cloudflared tunnel --config cloudflared-config.yml run reinocast

# This line will only be reached if cloudflared exits
cleanup

