# Weather.IO — Performance-Optimized Weather System

A full-stack weather application built with Next.js, TypeScript, and PostgreSQL, focused on real-world system performance, caching strategies, and backend efficiency.

---

## Live Demo

https://weather-ey07179ip-shadows5-projects.vercel.app/

---

## Purpose of This Project

Most weather applications are simple API wrappers.

This project focuses on:

- reducing latency in real-world requests  
- optimizing database and API interactions  
- applying caching strategies  
- designing systems with performance trade-offs  
- understanding full request lifecycle from UI to database  

---

## Performance Overview

### Desktop

- First Contentful Paint: 0.2s  
- Largest Contentful Paint: 0.4s  
- Total Blocking Time: 30ms  
- Speed Index: 0.9s  
- Cumulative Layout Shift: 0  

### Mobile

- First Contentful Paint: 0.8s  
- Largest Contentful Paint: 2.1s  
- Total Blocking Time: 40ms  
- Speed Index: 0.8s  
- Cumulative Layout Shift: 0  

---

## Before vs After Optimization

| Metric | Before | After |
|--------|--------|--------|
| Page Load Time | ~2.5s | ~400–500ms steady state |
| API Calls | Every request | Cached / conditional fetch |
| Database Writes | Always executed | Only on change detection |
| Blocking Time | High | ~30–40ms |
| System Behavior | Unstable | Predictable and optimized |

---

## System Architecture

```mermaid
flowchart TD
A[User Request] --> B[Next.js Server Action]

B --> C{Cache Layer}
C -->|Hit| D[Return Cached Data]
C -->|Miss| E[Fetch Weather API]

E --> F[Change Detection Logic]
F -->|No Change| G[Skip Database Write]
F -->|Change| H[Update PostgreSQL via Prisma]

H --> I[Database Layer]
G --> J[ISR / Revalidation Layer]

I --> J
J --> K[UI Render]

## Key Engineering Decisions

### Caching Strategy
Reduces external API dependency and improves response time.

### Conditional Database Writes
Only updates database when weather data actually changes.

### Server Actions
Eliminates API routes and reduces network overhead.

### ISR (Incremental Static Regeneration)
Balances freshness and performance using controlled revalidation.

### Selective Queries
Fetches only required fields to reduce payload size.

---

## Trade-offs

- In-memory caching resets on server restart  
- Weather data may be slightly delayed  
- No distributed cache layer (Redis not implemented yet)  
- Prioritizes speed over strict real-time accuracy  

---

## Tech Stack

- Next.js (App Router, Server Actions)
- TypeScript
- PostgreSQL
- Prisma ORM
- Tailwind CSS
- Vercel Deployment

---

## Key Learnings

- Performance is a system design problem, not just frontend optimization  
- Cache invalidation is harder than caching itself  
- Database writes are often hidden bottlenecks  
- Small architectural changes create large performance gains  
- Real-world systems require trade-offs between accuracy and speed  

---

## Future Improvements

- Redis-based distributed caching  
- Background job queue for weather updates  
- Rate limiting per user  
- WebSockets for live updates  
- Edge caching for global performance  