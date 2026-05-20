## 1. TypeScript Type Updates

- [x] 1.1 Add PerformanceMetrics interface with return fields (1M, 3M, 6M, 1Y, YTD)
- [x] 1.2 Extend Fund interface to include optional performance metrics
- [x] 1.3 Update HistoricalData interface to ensure daily change is required

## 2. Performance Calculation Utilities

- [x] 2.1 Create performance calculation utility function
- [x] 2.2 Implement 1-month return calculation
- [x] 2.3 Implement 3-month return calculation
- [x] 2.4 Implement 6-month return calculation
- [x] 2.5 Implement 1-year return calculation
- [x] 2.6 Implement YTD return calculation
- [x] 2.7 Add memoization for performance calculations
- [x] 2.8 Handle insufficient data gracefully (return null for missing metrics)

## 3. Comparison Metrics Component Enhancement

- [x] 3.1 Add performance metrics columns to ComparisonMetrics table
- [x] 3.2 Add daily percentage change column
- [x] 3.3 Format percentage values with appropriate decimal places
- [x] 3.4 Display "N/A" for missing metrics
- [x] 3.5 Add color coding for positive/negative returns

## 4. Chart Component Enhancement

- [x] 4.1 Add normalized view toggle component
- [x] 4.2 Implement normalized value calculation for chart data
- [x] 4.3 Update FundChart to support normalized mode
- [x] 4.4 Add visual indicator for current view mode
- [x] 4.5 Preserve absolute view as default

## 5. Mock Data Updates

- [x] 5.1 Add realistic performance metrics to mock fund data
- [x] 5.2 Add daily change values to historical mock data
- [x] 5.3 Ensure mock data covers all time periods for testing

## 6. Integration and Testing

- [x] 6.1 Update home page to pass performance metrics to components
- [x] 6.2 Test performance calculation with various date ranges
- [x] 6.3 Test normalized view toggle functionality
- [x] 6.4 Test display with funds having insufficient historical data
- [x] 6.5 Verify responsive layout with additional table columns
