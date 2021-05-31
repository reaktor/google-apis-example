Google APIs examples.

## Setup Google Sheets integration

You'll need a Google Cloud Services project, with a Google service account and a Google Sheet.

1. Create `.env.local` file
2. In that file add `GOOGLE_SHEETS_ID=...` which points to the ID of your sheet
3. Add `GOOGLE_SERVICE_KEY='{ ... }'` with the JSON key of your Google service account
4. Share your Sheet with the service user, by the email address of the service account

## Setup Google OAuth2 integration

1. Set the `GOOGLE_OAUTH_CLIENT_ID` and `GOOGLE_OAUTH_CLIENT_SECRET` environment variables in `.env.local` based on an OAuth2 client ID you've created in Google Cloud Console
2. Set `GOOGLE_OAUTH_CALLBACK=http://localhost:3000/api/google-callback` in `.env.local`. Make sure you've enabled this callback URL for your OAuth client ID.

## Run it

1. Run the dev server `yarn dev`
2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.