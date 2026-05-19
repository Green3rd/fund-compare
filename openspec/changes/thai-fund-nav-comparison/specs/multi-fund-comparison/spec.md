## ADDED Requirements

### Requirement: Select multiple funds for comparison
The system SHALL allow users to select multiple mutual funds (up to 5) for simultaneous comparison.

#### Scenario: Add fund to comparison
- **WHEN** a user selects a fund from the search results
- **THEN** the system adds the fund to the comparison list and displays its data

#### Scenario: Maximum funds reached
- **WHEN** a user attempts to add a 6th fund to the comparison
- **THEN** the system displays a message indicating the maximum limit (5 funds) has been reached

#### Scenario: Remove fund from comparison
- **WHEN** a user clicks the remove button on a selected fund
- **THEN** the system removes the fund from the comparison list and updates the display

### Requirement: Display synchronized comparison charts
The system SHALL display synchronized charts for all selected funds with aligned time axes.

#### Scenario: Multi-fund chart synchronization
- **WHEN** multiple funds are selected for comparison
- **THEN** the system displays charts with synchronized x-axis (dates) for accurate comparison

#### Scenario: Synchronized tooltips
- **WHEN** a user hovers over a date on any chart
- **THEN** the system displays tooltips for all funds at that same date

### Requirement: Show comparison metrics table
The system SHALL display a comparison table showing key metrics for all selected funds side-by-side.

#### Scenario: Display current metrics
- **WHEN** funds are selected for comparison
- **THEN** the system displays a table with current NAV, fund name, category, and management company

#### Scenario: Display performance metrics
- **WHEN** historical data is loaded for selected funds
- **THEN** the system displays calculated metrics including 1-month, 3-month, 6-month, 1-year, and YTD returns

### Requirement: Support normalized comparison view
The system SHALL provide an option to normalize fund prices to a common baseline for percentage-based comparison.

#### Scenario: Enable normalized view
- **WHEN** a user toggles the "Normalize" option
- **THEN** the system rebases all fund prices to 100 at the start date for percentage comparison

#### Scenario: Disable normalized view
- **WHEN** a user toggles off the "Normalize" option
- **THEN** the system displays actual NAV values on their original scales

### Requirement: Persist comparison selection in URL
The system SHALL encode selected fund codes in the URL to enable sharing and bookmarking of comparisons.

#### Scenario: Update URL on fund selection
- **WHEN** a user adds or removes funds from the comparison
- **THEN** the system updates the URL query parameters with the current fund codes

#### Scenario: Load comparison from URL
- **WHEN** a user visits a URL with fund codes in query parameters
- **THEN** the system automatically loads and displays the specified funds for comparison

### Requirement: Handle comparison with different date ranges
The system SHALL align data from funds with different historical data availability.

#### Scenario: Funds with different inception dates
- **WHEN** comparing funds with different inception dates
- **THEN** the system displays data from the earliest common date available for all funds

#### Scenario: Missing data for some funds
- **WHEN** one or more funds have missing data for certain dates
- **THEN** the system displays available data and indicates gaps in the comparison
