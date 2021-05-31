import { google } from "googleapis"
import { getEnv } from "./env"

const sheets = google.sheets('v4')
const GOOGLE_SHEETS_ID = getEnv("GOOGLE_SHEETS_ID")
const GOOGLE_SERVICE_KEY = JSON.parse(getEnv("GOOGLE_SERVICE_KEY"))
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

export async function getSheetData(): Promise<string[][]> {
    const auth = await getAuthToken()
    const sheet = await getSpreadSheetValues({
        spreadsheetId: GOOGLE_SHEETS_ID,
        range: 'Pages',
        auth,
    })

    const sheetRows = sheet.data.values as unknown as string[][]
    return sheetRows
}

async function getSpreadSheetValues({
    spreadsheetId,
    range,
    auth,
}: {
    spreadsheetId: string
    range: string
    auth: any
}) {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        auth,
        range,
    })
    return res
}

async function getAuthToken() {
    const auth = new google.auth.GoogleAuth({
      credentials: GOOGLE_SERVICE_KEY,
      scopes: SCOPES,
    })
    const authToken = await auth.getClient()
    return authToken
  }