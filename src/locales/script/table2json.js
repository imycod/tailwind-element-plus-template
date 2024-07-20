import ExcelJS from "exceljs"
import path from "path"
import fs from 'fs';
import config from './config.js'

const projectRoot = process.cwd();
const localsScriptPath = path.join(projectRoot,"src", "locales","script");

const __dirname = localsScriptPath

// 从 XLSX 文件中读取数据并转换为 JSON 格式
async function tableToJSON(filename) {
	try {
		const workbook = new ExcelJS.Workbook();
		await workbook.xlsx.readFile(path.resolve(__dirname, filename));
		const sheetName = config.sheetName;
		const worksheet = workbook.getWorksheet(sheetName);
		const jsonResult = config.langs;

		// 遍历每一行数据，将每行的标题作为键，对应的翻译作为值
		worksheet.eachRow(function (row, rowNumber) {
			if (rowNumber > 1) {
				// 从第二行开始读取，因为第一行是标题
				const title = row.getCell(1).text; // 第一列是标题
				Object.keys(jsonResult).forEach((key, index) => {
					jsonResult[key][title] = row.getCell(2 + index).text || '';
				});
			}
		});

		return jsonResult;
	} catch (err) {
		console.error(`读取 XLSX 文件 ${filename} 时出错:`, err);
		return null;
	}
}

// 读取 JSON 文件并解析
function readJSONFile(filename) {
	return new Promise((resolve, reject) => {
		try {
			const data = fs.readFileSync(filename, 'utf8');
			resolve(JSON.parse(data));
		} catch (err) {
			console.error(`读取 JSON 文件 ${filename} 时出错:`, err);
			resolve({});
		}
	});
}

// 写入 JSON 数据到文件
function writeJSONToFile(data, language, outputDir) {
	const outputFilename = path.join(outputDir, `${language}.json`);
	try {
		fs.writeFileSync(outputFilename, JSON.stringify(data, null, 4), 'utf8');
		console.log(`已将 ${language} 的 JSON 数据写入到 ${outputFilename}`);
	} catch (err) {
		console.error(`写入 ${language} 的 JSON 数据到文件 ${outputFilename} 时出错:`, err);
	}
}

// 更新现有 JSON 数据
function updateJSONData(existingData, newData) {
	Object.keys(existingData).forEach((key) => {
		// 以现有数据为准，同时保证新数据中的新增字段不被覆盖
		existingData[key] = newData[key] || existingData[key] || '';
	});
	return existingData;
}

const localsPath = path.join(projectRoot,"src", "locales");

// 主函数
async function main() {
	const xlsxFile = config.xlsxFile; // 替换成你的表格文件路径
	const inputDir = localsPath; // 输入文件夹路径
	const outputDir = localsPath; // 输出文件夹路径

	// 创建输出文件夹
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}

	const jsonData = await tableToJSON(xlsxFile);
	if (jsonData) {
		// 将数据写入各个语言的 JSON 文件
		Object.keys(jsonData).forEach(async (key) => {
			const inputFile = path.join(inputDir, `${key}.json`);
			let existingData = {};

			// 如果输入文件夹中存在对应语言的 JSON 文件，就读取并更新
			if (fs.existsSync(inputFile)) {
				existingData = await readJSONFile(inputFile);
				existingData = updateJSONData(existingData, jsonData[key]);
			} else {
				// 如果不存在，就使用新的数据
				existingData = jsonData[key];
			}

			writeJSONToFile(existingData, key, outputDir);
		});
	} else {
		console.error('将 XLSX 文件转换为 JSON 时出错。');
	}
}

main();
