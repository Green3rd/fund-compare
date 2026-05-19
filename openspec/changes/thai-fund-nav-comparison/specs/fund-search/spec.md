## ADDED Requirements

### Requirement: Search funds by name or code
The system SHALL allow users to search for mutual funds by fund name or fund code.

#### Scenario: Search by fund name
- **WHEN** a user enters a fund name in the search box
- **THEN** the system displays matching funds with names containing the search term (case-insensitive)

#### Scenario: Search by fund code
- **WHEN** a user enters a fund code in the search box
- **THEN** the system displays funds with codes matching or containing the search term

#### Scenario: No results found
- **WHEN** a user's search query matches no funds
- **THEN** the system displays a "No funds found" message with suggestions to try different keywords

### Requirement: Filter funds by category
The system SHALL allow users to filter the fund list by fund category (e.g., equity, fixed income, balanced).

#### Scenario: Apply category filter
- **WHEN** a user selects one or more fund categories from the filter options
- **THEN** the system displays only funds belonging to the selected categories

#### Scenario: Clear category filter
- **WHEN** a user clears the category filter
- **THEN** the system displays all available funds

### Requirement: Filter funds by management company
The system SHALL allow users to filter funds by asset management company.

#### Scenario: Select management company
- **WHEN** a user selects a management company from the filter dropdown
- **THEN** the system displays only funds managed by the selected company

#### Scenario: Clear management company filter
- **WHEN** a user clears the management company filter
- **THEN** the system displays funds from all management companies

### Requirement: Display search results with key information
The system SHALL display search results showing fund code, name, category, latest NAV, and NAV date.

#### Scenario: Show search results
- **WHEN** search results are displayed
- **THEN** each result shows fund code, full fund name, category, current NAV per unit, and NAV date

#### Scenario: Sort search results
- **WHEN** a user clicks a column header in the results
- **THEN** the system sorts results by that column in ascending or descending order

### Requirement: Provide autocomplete suggestions
The system SHALL provide autocomplete suggestions as users type in the search box.

#### Scenario: Display autocomplete suggestions
- **WHEN** a user types at least 2 characters in the search box
- **THEN** the system displays up to 10 matching fund suggestions below the search box

#### Scenario: Select autocomplete suggestion
- **WHEN** a user clicks on an autocomplete suggestion
- **THEN** the system populates the search box with the selected fund and displays its details

### Requirement: Support combined filters
The system SHALL allow users to apply multiple filters simultaneously (search term + category + management company).

#### Scenario: Apply multiple filters
- **WHEN** a user enters a search term and selects category and management company filters
- **THEN** the system displays only funds matching all applied criteria

#### Scenario: No results with combined filters
- **WHEN** combined filters produce no matching funds
- **THEN** the system displays a message suggesting to relax some filter criteria
