## ADDED Requirements

### Requirement: Fetch fund list from SEC API
The system SHALL retrieve a complete list of Thai mutual funds from the SEC Thailand API.

#### Scenario: Successful fund list retrieval
- **WHEN** the application requests the fund list from SEC API
- **THEN** the system returns an array of fund objects containing fund code, name, category, and management company

#### Scenario: API unavailable
- **WHEN** the SEC API is unavailable or returns an error
- **THEN** the system returns cached fund list data if available, or displays an error message to the user

### Requirement: Fetch current NAV data
The system SHALL retrieve current Net Asset Value (NAV) data for a specified mutual fund from the SEC API.

#### Scenario: Successful NAV retrieval
- **WHEN** the application requests NAV data for a valid fund code
- **THEN** the system returns the latest NAV per unit, NAV date, and fund details

#### Scenario: Invalid fund code
- **WHEN** the application requests NAV data for an invalid or non-existent fund code
- **THEN** the system returns an error indicating the fund was not found

### Requirement: Fetch historical NAV data
The system SHALL retrieve historical NAV data for a specified mutual fund and date range from the SEC API.

#### Scenario: Successful historical data retrieval
- **WHEN** the application requests historical NAV data for a valid fund code and date range
- **THEN** the system returns an array of NAV values with corresponding dates

#### Scenario: Date range exceeds available data
- **WHEN** the requested date range includes dates before the fund's inception
- **THEN** the system returns available data within the valid date range

### Requirement: Cache API responses
The system SHALL cache SEC API responses to minimize redundant API calls and improve performance.

#### Scenario: Cache hit for recent data
- **WHEN** the application requests data that was fetched within the cache TTL (15-30 minutes)
- **THEN** the system returns cached data without making a new API call

#### Scenario: Cache miss or expired data
- **WHEN** the application requests data that is not cached or cache has expired
- **THEN** the system fetches fresh data from SEC API and updates the cache

### Requirement: Handle rate limiting
The system SHALL implement retry logic with exponential backoff when encountering SEC API rate limits.

#### Scenario: Rate limit encountered
- **WHEN** the SEC API returns a rate limit error (HTTP 429)
- **THEN** the system waits with exponential backoff before retrying the request

#### Scenario: Maximum retries exceeded
- **WHEN** the system exceeds the maximum number of retry attempts
- **THEN** the system returns an error message indicating the service is temporarily unavailable
