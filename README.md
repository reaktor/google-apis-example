Google APIs examples implemented on Next.js.

See [Live demo](https://google-apis-example.herokuapp.com/)

# Google auth implementation

- Pages like [page2](https://github.com/reaktor/google-apis-example/blob/main/pages/page2.tsx) use a [withAuthentication](https://github.com/reaktor/google-apis-example/blob/main/src/withAuthentication.ts) wrapper that redirects to Google Login if no valid session cookie.
- Google auth page URL generated [here](https://github.com/reaktor/google-apis-example/blob/main/src/googleAuth.ts#L24) using Google OAuth2 API.
- The `/api/google-callback` endpoint handles the callback from Google, verifies code from Google using the [getGoogleAccountFromCode](getGoogleAccountFromCode) helper and redirects to the path that the user originally requested
- We utilize the [`hd='reaktor.fi'`](https://github.com/reaktor/google-apis-example/blob/main/src/googleAuth.ts#L27) parameter to streamline the Login process for Reaktor users. This way Google doesn't present the "select account" dialog for users who have both Work and Personal Google accounts.

## Problems with Privacy Plugins

Plugins, including but not necessarily limited to Privacy Badger, do actually break the Google login in at least when your user enters your site from an external like (from Slack for example) if Google needs to present the "select account" dialog. This happens because Privacy Badger incorrectly prevents auth.google.com from accessing its own cookies. 

Workarounds:

- The usage of the `hd` parameter fixes this, but the same fix doesn't of course apply to cases where you don't have a single domain (like reaktor.fi) to streamline for
- Performing a client side Javascript redirect instead of a server side redirect seems to fix this. So instead of responding with `302 - FOUND` and a `Location` header, you respond with something like `<script>document.location=...</script>`

# Setup locally

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
