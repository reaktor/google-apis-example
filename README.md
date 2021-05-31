Google APIs examples.

## Getting Started

You'll need a Google service account and a Google Sheet.

1. Create `.env.local` file
2. In that file add `GOOGLE_SHEETS_ID=...` which points to the ID of your sheet
3. Add `GOOGLE_SERVICE_KEY='{ ... }'` with the JSON key of your Google service account
4. Make sure to share your Sheet with the service user, by email
5. Run the dev server `yarn dev`


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.