## Why

The current fund comparison only displays NAV values in the table and chart. Users need to compare funds across multiple dimensions to make informed investment decisions, including performance metrics, fund categories, management companies, and daily percentage changes.

## What Changes

- Add performance metrics calculation (1M, 3M, 6M, 1Y, YTD returns) to comparison table
- Display daily percentage change alongside NAV values
- Add fund category and management company to the comparison view
- Create performance comparison chart showing percentage-based returns
- Add normalized view toggle for comparing funds with different NAV levels

## Capabilities

### New Capabilities
- `performance-metrics`: Calculate and display fund performance metrics over various time periods
- `multi-metric-comparison`: Compare funds across multiple dimensions (NAV, returns, category, management company)
- `normalized-chart-view`: Display charts with normalized percentage-based comparison

### Modified Capabilities
- None

## Impact

- Affected components: ComparisonMetrics, FundChart, home page
- New utility functions for performance calculation
- Updated API endpoints to include additional data fields
- Enhanced mock data with performance metrics
