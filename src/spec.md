# Specification

## Summary
**Goal:** Allow any public (including anonymous) visitor to submit a quote request, while keeping quote viewing restricted to admins.

**Planned changes:**
- Update the backend authorization for quote submission so anonymous callers can successfully create and persist quote requests.
- Change backend quote storage to support multiple anonymous/public submissions without overwriting previous entries.
- Update the backend API response shape (as needed) and adjust the frontend admin “View Quotes” page to load and render the new structure, including a stable key per row.
- Add a conditional backend stable-state migration so any existing stored quote requests remain accessible after upgrade.

**User-visible outcome:** Anyone can submit a quote request without logging in, and admins can still securely view all quote requests in the admin-only “View Quotes” page.
