import { google } from "googleapis"
import { getEnv } from "./env";

const googleConfig = {
    clientID: getEnv("GOOGLE_OAUTH_CLIENT_ID"),
    clientSecret: getEnv("GOOGLE_OAUTH_CLIENT_SECRET"),
    callbackURL: getEnv("GOOGLE_OAUTH_CALLBACK")
}
const googleScopes = [
    'email',
    'https://www.googleapis.com/auth/userinfo.profile',
]

export type UserInfo = {
    name: string,
    email: string,
    photoURL?: string
}

function googleOAUTH2() {
    return new google.auth.OAuth2(googleConfig.clientID, googleConfig.clientSecret, googleConfig.callbackURL)
}

export function googleAuthPageURL() {
    return googleOAUTH2().generateAuthUrl({
        scope: googleScopes,
        hd: "reaktor.fi" // Streamline login process for Reaktor users, see https://developers.google.com/identity/protocols/oauth2/openid-connect#hd-param
    });
}

export async function getGoogleAccountFromCode(code: string): Promise<UserInfo> {
    const auth = googleOAUTH2();
    const data = await auth.getToken(code);
    const tokens = data.tokens;

    auth.setCredentials(tokens);
    const plus = google.people({ version: 'v1', auth });
    const me = await plus.people.get({
        resourceName: "people/me",
        personFields: "names,emailAddresses,photos"
    });

    return {
        name: me.data.names![0].displayName!,
        email: me.data.emailAddresses![0].value!,
        photoURL: me.data.photos![0].url || undefined
    };
}