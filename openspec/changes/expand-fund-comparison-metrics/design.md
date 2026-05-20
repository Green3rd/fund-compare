## Context

The current fund comparison application only displays NAV (Net Asset Value) in the comparison table and chart. The Fund type includes additional fields like category and management company, but these are not prominently displayed for comparison. Historical data includes daily change values, but performance metrics over time periods (1M, 3M, 6M, 1Y, YTD) are not calculated or shown. Users need comprehensive comparison data to make informed investment decisions.

## Goals / Non-Goals

**Goals:**
- Calculate and display performance metrics (1M, 3M, 6M, 1Y, YTD returns) for each fund
- Show daily percentage change in the comparison table
- Display fund category and management company as sortable/comparable fields
- Create normalized chart view to compare funds with different NAV levels
- Enhance comparison table with additional metrics columns

**Non-Goals:**
- Real-time streaming of data (current polling/caching approach is sufficient)
- Advanced financial metrics (Sharpe ratio, beta, etc.) - focus on basic returns
- Fund screening/filtering by performance metrics (comparison only)

## Decisions

**Performance Calculation Approach:**
- Calculate returns based on historical NAV data using simple percentage change formula: ((current - start) / start) * 100
- Use historical data API for time-based calculations
- Cache calculated metrics with same TTL as historical data (15-30 min)
- Rationale: Simple approach sufficient for comparison, avoids complex financial modeling

**Normalized Chart View:**
- Normalize all funds to start at 100% for the selected date range
- Calculate percentage change from first data point in range
- Toggle between absolute NAV and normalized percentage view
- Rationale: Allows comparison of funds with vastly different NAV levels

**Data Structure:**
- Extend Fund interface with optional performance metrics fields
- Create new PerformanceMetrics interface for calculated values
- Keep existing API structure, add calculation layer in frontend
- Rationale: Minimal API changes, calculations can be done client-side with cached data

**UI Layout:**
- Add new columns to comparison table for performance metrics
- Add toggle switch for normalized chart view
- Keep existing layout, expand table horizontally
- Rationale: Maintains familiarity, adds information without major redesign

## Risks / Trade-offs

**Risk:** Performance calculations may be slow with large historical datasets
- **Mitigation:** Use memoization and caching, limit to 5 funds max (already enforced)

**Risk:** Normalized view may be confusing for users unfamiliar with percentage-based charts
- **Mitigation:** Add clear labels and tooltips explaining the normalization

**Trade-off:** More columns in table may require horizontal scrolling on mobile
- **Mitigation:** Responsive design with scrollable table container

**Risk:** Incomplete historical data may lead to inaccurate metrics
- **Mitigation:** Handle missing data gracefully, show "N/A" for unavailable metrics

## Migration Plan

1. Update TypeScript interfaces for performance metrics
2. Create utility functions for performance calculation
3. Enhance ComparisonMetrics component with new columns
4. Add normalized view toggle to FundChart component
5. Update mock data to include realistic performance metrics
6. Test with various fund combinations and date ranges

No database migration needed - changes are frontend-only with existing API data.

## Open Questions

- Should performance metrics be calculated server-side or client-side? (Decision: client-side for now, can move to server if performance issues arise)
- What date should be used for YTD calculation? (Assume January 1st of current year)
- How to handle funds with insufficient historical data for requested time period? (Show "N/A" and disable normalization for that fund)
