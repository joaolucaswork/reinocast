---
type: "always_apply"
---

# Dual Memory Storage Protocol

## Overview

This document defines the workflow rule for storing information in memory systems when the user requests information to be remembered or saved.

## Rule Definition

**Rule Name:** Dual Memory Storage Protocol

**Trigger Conditions:**

- User explicitly asks to remember something
- User requests information to be saved
- User uses phrases like "save this", "remember that", "store this information", etc.

## Required Actions

When the trigger conditions are met, you MUST perform BOTH of the following actions consecutively:

### 1. Save to Augment Native Memory System

- **Tool:** `remember`
- **Purpose:** Store information in Augment's built-in memory system
- **Format:** Concise, single-sentence memory entry

### 2. Save to mem0 MCP Memory System

- **Tool:** `add-memory_mem0-memory`
- **Purpose:** Store information in the mem0 MCP memory backend
- **Format:** Same or equivalent information as stored in Augment memory

## Implementation Guidelines

### Information Consistency

- Both memory systems should receive the same or semantically equivalent information
- Ensure no information loss between the two storage operations
- Maintain consistent formatting and detail level across both systems

### Execution Order

1. Call `remember` tool first
2. Call `add-memory_mem0-memory` tool second
3. Confirm successful storage in both systems

### Error Handling

- If one memory system fails, still attempt to save to the other
- Inform the user if either storage operation fails
- Retry failed operations if appropriate

## Benefits

### Redundancy

- Information is preserved even if one memory system experiences issues
- Reduces risk of data loss

### Consistency

- Both memory backends maintain synchronized information
- Ensures reliable recall regardless of which system is queried

### Reliability

- Dual storage provides backup mechanism
- Increases confidence in long-term memory persistence

## Examples

### Example 1: User Preference

**User Request:** "Remember that I prefer TypeScript over JavaScript"

**Actions:**

1. `remember`: "User prefers TypeScript over JavaScript"
2. `add-memory_mem0-memory`: "User prefers TypeScript over JavaScript"

### Example 2: Project Context

**User Request:** "Save that this project uses Next.js 14 with App Router"

**Actions:**

1. `remember`: "Project uses Next.js 14 with App Router"
2. `add-memory_mem0-memory`: "Project uses Next.js 14 with App Router"

### Example 3: Personal Information

**User Request:** "Remember my name is João Lucas"

**Actions:**

1. `remember`: "User's name is João Lucas"
2. `add-memory_mem0-memory`: "User's name is João Lucas"

## Compliance

This protocol is mandatory for all memory storage operations. Failure to use both memory systems when requested constitutes a violation of the established workflow rule.

## Version History

- **v1.0** (2025-10-18): Initial protocol definition
