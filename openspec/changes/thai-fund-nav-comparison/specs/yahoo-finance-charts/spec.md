## ADDED Requirements

### Requirement: Fetch historical price data from Yahoo Finance
The system SHALL retrieve historical price data for Thai mutual funds from Yahoo Finance API.

#### Scenario: Successful data retrieval with valid ticker
- **WHEN** the application requests historical data for a fund with a valid Yahoo Finance ticker
- **THEN** the system returns an array of price points with dates, values, and percentage changes

#### Scenario: Fund not available on Yahoo Finance
- **WHEN** the application requests data for a fund without a Yahoo Finance ticker
- **THEN** the system falls back to SEC API historical data

### Requirement: Map fund codes to Yahoo Finance tickers
The system SHALL maintain a mapping between Thai fund codes and Yahoo Finance ticker symbols.

#### Scenario: Mapping exists for fund
- **WHEN** the application looks up a Yahoo Finance ticker for a known fund code
- **THEN** the system returns the corresponding ticker symbol (e.g., "FUNDCODE.BK")

#### Scenario: No mapping exists
- **WHEN** the application looks up a ticker for an unmapped fund code
- **THEN** the system attempts to construct the ticker using standard format or returns null

### Requirement: Display interactive price charts
The system SHALL render interactive line charts showing historical fund performance over time.

#### Scenario: Single fund chart display
- **WHEN** a user views a single fund's historical data
- **THEN** the system displays an interactive line chart with date on x-axis and NAV/price on y-axis

#### Scenario: Multi-fund overlay chart
- **WHEN** a user compares multiple funds
- **THEN** the system displays overlaid line charts with different colors for each fund and a legend

### Requirement: Support chart interactivity
The system SHALL provide interactive features for chart exploration including zoom, pan, and tooltips.

#### Scenario: Hover tooltip display
- **WHEN** a user hovers over a data point on the chart
- **THEN** the system displays a tooltip showing the date, NAV value, and percentage change

#### Scenario: Date range zoom
- **WHEN** a user selects a date range on the chart
- **THEN** the system zooms the chart to display only the selected time period

#### Scenario: Chart reset
- **WHEN** a user clicks the reset button
- **THEN** the system restores the chart to the original date range and zoom level

### Requirement: Cache Yahoo Finance data
The system SHALL cache Yahoo Finance API responses for 1 hour to reduce API calls and improve performance.

#### Scenario: Recent data cached
- **WHEN** the application requests data that was fetched within 1 hour
- **THEN** the system returns cached data without making a new API call

#### Scenario: Cache expired
- **WHEN** cached data is older than 1 hour
- **THEN** the system fetches fresh data from Yahoo Finance and updates the cache

### Requirement: Handle missing or incomplete data
The system SHALL gracefully handle missing or incomplete historical data from Yahoo Finance.

#### Scenario: Partial data available
- **WHEN** Yahoo Finance returns incomplete data for the requested date range
- **THEN** the system displays available data and indicates gaps in the timeline

#### Scenario: No data available
- **WHEN** Yahoo Finance has no data for a fund
- **THEN** the system displays a message and offers to show SEC API data instead
