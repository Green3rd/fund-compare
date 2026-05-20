## ADDED Requirements

### Requirement: Provide normalized chart view
The system SHALL provide a toggle to switch between absolute NAV values and normalized percentage-based chart view.

#### Scenario: Toggle to normalized view
- **WHEN** user clicks normalized view toggle
- **THEN** chart displays all funds normalized to 100% at the start of the date range

#### Scenario: Toggle to absolute view
- **WHEN** user clicks absolute view toggle
- **THEN** chart displays actual NAV values for all funds

### Requirement: Calculate normalized values
The system SHALL calculate normalized percentage values for each fund relative to the first data point in the selected date range.

#### Scenario: Calculate normalized values for chart
- **WHEN** normalized view is active
- **THEN** each fund's values are calculated as ((current value - first value) / first value) * 100

### Requirement: Handle funds with different NAV levels
The system SHALL enable meaningful comparison of funds with vastly different NAV levels through normalized percentage view.

#### Scenario: Compare high and low NAV funds
- **WHEN** user compares a fund with NAV of 10 and a fund with NAV of 100
- **THEN** normalized view shows percentage changes on the same scale for easy comparison
