## ADDED Requirements

### Requirement: Calculate performance returns
The system SHALL calculate percentage returns for funds over specified time periods (1M, 3M, 6M, 1Y, YTD) based on historical NAV data.

#### Scenario: Calculate 1-month return
- **WHEN** historical data is available for the past 30 days
- **THEN** system calculates return as ((current NAV - NAV 30 days ago) / NAV 30 days ago) * 100

#### Scenario: Calculate YTD return
- **WHEN** historical data is available from January 1st of current year
- **THEN** system calculates return as ((current NAV - NAV on Jan 1) / NAV on Jan 1) * 100

### Requirement: Display performance metrics in comparison table
The system SHALL display calculated performance metrics (1M, 3M, 6M, 1Y, YTD) as percentage values in the comparison table.

#### Scenario: Show performance metrics for selected funds
- **WHEN** user has selected multiple funds
- **THEN** comparison table displays performance metrics for each fund in separate columns

#### Scenario: Handle insufficient data
- **WHEN** historical data is insufficient for a time period
- **THEN** system displays "N/A" for that metric

### Requirement: Display daily percentage change
The system SHALL display daily percentage change alongside NAV values in the comparison table.

#### Scenario: Show daily change in table
- **WHEN** historical data includes daily change values
- **THEN** system displays daily percentage change in the comparison table
