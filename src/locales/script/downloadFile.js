import {execSync} from "child_process"
import path from "path"
import fs from 'fs';
import axios from 'axios';
import config from './config.js'

const projectRoot = process.cwd();
const localsScriptPath = path.join(projectRoot,"src", "locales", "script");
const filePath = path.join(localsScriptPath, config.xlsxFile);

const googleSheetUrl = `https://docs.google.com/spreadsheets/d/${config.fileId}/export?format=xlsx&gid=${config.gid}#gid=${config.gid}`;

// Ensure the 'locals' directory exists
if (!fs.existsSync(localsScriptPath)) {
	fs.mkdirSync(localsScriptPath);
}

// Function to download the file
async function downloadFile(url, destination) {
	const writer = fs.createWriteStream(destination);

	try {
		const response = await axios({
			url,
			method: 'GET',
			responseType: 'stream',
		});

		response.data.pipe(writer);

		return new Promise((resolve, reject) => {
			writer.on('finish', resolve);
			writer.on('error', reject);
		});
	} catch (error) {
		console.error(`Error downloading the file: ${error.message}`);
		fs.unlinkSync(destination);
	}
}

// Start the download
console.log(`Starting download from: ${googleSheetUrl}`);
downloadFile(googleSheetUrl, filePath)
	.then(() => {
		console.log('Download completed!');
	})
	.catch((error) => {
		console.error(`Error: ${error.message}`);
	});