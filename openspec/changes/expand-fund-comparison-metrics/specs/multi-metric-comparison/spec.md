## ADDED Requirements

### Requirement: Display fund category in comparison
The system SHALL display fund category as a sortable field in the comparison table.

#### Scenario: Show category for each fund
- **WHEN** funds are selected for comparison
- **THEN** comparison table displays category column with fund category values

### Requirement: Display management company in comparison
The system SHALL display management company as a sortable field in the comparison table.

#### Scenario: Show management company for each fund
- **WHEN** funds are selected for comparison
- **THEN** comparison table displays management company column with company names

### Requirement: Enable multi-dimensional comparison
The system SHALL allow users to compare funds across multiple dimensions simultaneously (NAV, returns, category, management company).

#### Scenario: Compare funds across all metrics
- **WHEN** user selects multiple funds
- **THEN** comparison table displays all available metrics for each fund side-by-side
