## Context

This is a new web application for comparing Thai mutual funds. Currently, there is no existing codebase. The application will integrate with two external data sources:
1. SEC Thailand API for official mutual fund data (NAV, fund details)
2. Yahoo Finance for historical price charts

Target users are Thai retail investors who need to compare multiple mutual funds side-by-side to make investment decisions.

## Goals / Non-Goals

**Goals:**
- Build a responsive web application accessible from desktop and mobile browsers
- Fetch real-time and historical NAV data from SEC Thailand API
- Display interactive historical charts using Yahoo Finance data
- Enable comparison of multiple funds (3-5 funds) simultaneously
- Provide fast, cached responses for frequently accessed fund data
- Create an intuitive UI for fund search and selection

**Non-Goals:**
- Real-time trading or portfolio management features
- User authentication or personalized portfolios (future enhancement)
- Mobile native apps (web-responsive only)
- Predictive analytics or AI-based recommendations
- Support for non-Thai mutual funds

## Decisions

### 1. Technology Stack

**Frontend: React + Next.js**
- **Why**: Next.js provides SSR/SSG for better SEO and initial load performance, built-in API routes for backend logic
- **Alternatives considered**: Vue.js (less ecosystem for financial charting), plain React (no SSR benefits)

**Charting: Recharts or Lightweight Charts**
- **Why**: Recharts integrates well with React, good for multi-series comparisons. Lightweight Charts (TradingView) offers better performance for financial data
- **Alternatives considered**: Chart.js (less React-friendly), D3.js (steeper learning curve)

**Styling: TailwindCSS + shadcn/ui**
- **Why**: Rapid development, consistent design system, accessible components
- **Alternatives considered**: Material-UI (heavier bundle), custom CSS (slower development)

### 2. Architecture Pattern

**Client-Server with API Routes**
- Frontend (Next.js pages) → Next.js API routes → External APIs (SEC, Yahoo Finance)
- **Why**: Keeps API keys secure on server side, enables response caching, simplifies deployment
- **Alternatives considered**: Separate backend service (over-engineering for MVP), direct client calls (exposes API keys)

### 3. Data Fetching Strategy

**Server-side caching with SWR/React Query on client**
- Cache SEC API responses for 15-30 minutes (NAV updates daily)
- Cache Yahoo Finance data for 1 hour
- Use SWR for client-side data fetching with automatic revalidation
- **Why**: Reduces API calls, improves performance, handles stale data gracefully
- **Alternatives considered**: No caching (slow, API rate limits), Redis cache (over-engineering for MVP)

### 4. SEC API Integration

**Use SEC Thailand's public API endpoints**
- Fund list: `/api/fund/list`
- NAV data: `/api/fund/nav/{fundCode}`
- **Why**: Official source, reliable data
- **Fallback**: If API is unstable, consider web scraping as backup (not preferred)

### 5. Yahoo Finance Integration

**Use yfinance library or Yahoo Finance API**
- Map Thai fund codes to Yahoo Finance tickers (format: `FUNDCODE.BK`)
- **Why**: Comprehensive historical data, widely used
- **Risk**: Not all Thai funds may be available on Yahoo Finance
- **Mitigation**: Fall back to SEC API historical data if Yahoo data unavailable

### 6. Data Model

**Fund Object:**
```typescript
{
  fundCode: string;
  fundName: string;
  navPerUnit: number;
  navDate: string;
  category: string;
  managementCompany: string;
}
```

**Historical Data:**
```typescript
{
  fundCode: string;
  data: Array<{
    date: string;
    nav: number;
    change: number;
  }>;
}
```

## Risks / Trade-offs

**Risk: SEC API rate limiting or downtime**
→ Mitigation: Implement caching, add retry logic with exponential backoff, display cached data with timestamp

**Risk: Yahoo Finance ticker mapping inconsistency**
→ Mitigation: Maintain manual mapping table for popular funds, allow fallback to SEC historical data

**Risk: Performance with large datasets (5 funds × 5 years of daily data)**
→ Mitigation: Use chart library with virtualization, limit initial date range to 1 year, lazy load extended history

**Trade-off: No user authentication in MVP**
→ Impact: Cannot save favorite funds or comparison sets. Users must re-select funds each session.
→ Justification: Faster MVP delivery, can add in v2

**Trade-off: Client-side state only (no database)**
→ Impact: No persistence of user preferences or historical queries
→ Justification: Simpler architecture, lower operational cost, sufficient for MVP

**Risk: Mobile responsiveness with complex charts**
→ Mitigation: Use responsive chart library, provide simplified mobile view, test on various screen sizes

## Migration Plan

N/A - This is a new application with no existing users or data to migrate.

**Deployment:**
1. Deploy to Vercel (recommended for Next.js) or similar platform
2. Configure environment variables for API keys
3. Set up monitoring for API errors and performance
4. Gradual rollout: Share with beta users before public launch

**Rollback:**
- If critical issues arise, Vercel allows instant rollback to previous deployment
- No database means no data migration concerns

## Open Questions

1. **API Key Management**: Does SEC API require authentication? Need to verify and obtain keys if necessary.
2. **Fund Universe Size**: How many Thai mutual funds exist? Will need pagination or search optimization if >1000 funds.
3. **Chart Interactivity**: Should charts support zoom, pan, and synchronized crosshairs across multiple funds?
4. **Export Functionality**: Should users be able to export comparison data to CSV/Excel? (Nice-to-have for v2)
5. **Performance Metrics**: Should we calculate and display Sharpe ratio, volatility, or other financial metrics? (Requires additional computation)
