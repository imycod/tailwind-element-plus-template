const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const axios = require('axios');
const XLSX = require('xlsx');
const config = require('./config.js')

// Load client secrets from a local file.
const CREDENTIALS_PATH = 'credentials.json'; // Update with your credentials file path
const TOKEN_PATH = 'token.json'; // This will be created after first authorization

// Scopes for Google APIs
const SCOPES = [
	'https://www.googleapis.com/auth/drive.file',
	'https://www.googleapis.com/auth/spreadsheets'
];

// Load or request authorization
async function authorize() {
	const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
	const { client_secret, client_id, redirect_uris } = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

	if (fs.existsSync(TOKEN_PATH)) {
		oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH)));
	} else {
		const authUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPES });
		console.log('Authorize this app by visiting this URL:', authUrl);
		const code = await getAuthorizationCode(); // Implement this function to get code from the user
		const token = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(token.tokens);
		fs.writeFileSync(TOKEN_PATH, JSON.stringify(token.tokens));
	}
	return oAuth2Client;
}

// Upload Excel file to Google Drive and convert to Google Sheets
async function uploadExcelToDrive(filePath, auth) {
	const drive = google.drive({ version: 'v3', auth });
	const fileMetadata = { name: path.basename(filePath), mimeType: 'application/vnd.google-apps.spreadsheet' };
	const media = { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', body: fs.createReadStream(filePath) };

	const file = await drive.files.create({ resource: fileMetadata, media, fields: config.fileId });
	console.log(`File uploaded successfully, File ID: ${file.data.id}`);
	return file.data.id;
}

// Update Google Sheets with data
async function updateGoogleSheet(spreadsheetId, sheetData, auth) {
	const sheets = google.sheets({ version: 'v4', auth });
	const resource = { values: sheetData };

	await sheets.spreadsheets.values.update({
		spreadsheetId,
		range: 'Sheet1!A1', // Update range as needed
		valueInputOption: 'RAW',
		resource
	});
	console.log('Google Sheet updated successfully.');
}

// Read data from local Excel file
function readExcelData(filePath) {
	const workbook = XLSX.readFile(filePath);
	const sheetName = workbook.SheetNames[0];
	const sheet = workbook.Sheets[sheetName];
	return XLSX.utils.sheet_to_json(sheet, { header: 1 });
}


const projectRoot = process.cwd();
const localsScriptPath = path.join(projectRoot,"src", "locales", "script");
const filePath = path.join(localsScriptPath, config.xlsxFile);
// Main function
(async function main() {
	// const auth = await authorize();
	// const fileId = await uploadExcelToDrive(filePath);
	axios.get("https://apikeys.googleapis.com/v2/projects/item-i18n-online-sheet/locations/global/keys").then(res=>{
		console.log(res)
	})
	// const sheetData = readExcelData(filePath);
	// console.log('sheetData---', sheetData);
	// await updateGoogleSheet('169209013', sheetData, auth);
})();
