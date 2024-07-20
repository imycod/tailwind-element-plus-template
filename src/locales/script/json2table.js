import ExcelJS from "exceljs"
import path from "path"
import fs from 'fs';
import config from './config.js'

const projectRoot = process.cwd();
const localsPath = path.join(projectRoot,"src", "locales","script");

const __dirname = localsPath

// 读取 JSON 文件并解析
function readJSONFile(filename) {
    try {
        const data = fs.readFileSync(path.resolve(__dirname, '..', filename), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`读取 JSON 文件 ${filename} 时出错:`, err);
        return null;
    }
}

// 读取现有的 XLSX 文件，如果文件不存在，则创建一个新的
async function getOrCreateWorkbook(result) {
    return new Promise(async (resolve, reject) => {
        const xlsxFile = config.xlsxFile;
        const filePath = path.resolve(__dirname, xlsxFile);
        const workbook = new ExcelJS.Workbook();
        const outputFilePath = path.resolve(__dirname, xlsxFile);
        const sheetName = config.sheetName;

        try {
            if (fs.existsSync(filePath)) {
                // 如果文件存在，读取文件
                await workbook.xlsx.readFile(filePath);
                console.log('工作簿已加载');
                const worksheet = workbook.getWorksheet(sheetName);
                if (!worksheet) {
                    console.error(`工作表 ${sheetName} 不存在。`);
                    const newWorksheet = workbook.addWorksheet(sheetName);
                    createWorkbookWithHeader(newWorksheet);
                    addXLSX(workbook, newWorksheet, outputFilePath, result);
                } else {
                    updateXLSX(workbook, worksheet, outputFilePath, result);
                }
            } else {
                const worksheet = workbook.addWorksheet(sheetName);
                // 如果文件不存在，创建新的工作簿和工作表
                createWorkbookWithHeader(worksheet);
                console.log('工作簿已创建');
                addXLSX(workbook, worksheet, outputFilePath, result);
            }
            resolve(workbook);
        } catch (error) {
            console.error('读取或创建工作簿时出错:', error);
            reject(error);
        }
    });
}

// 创建具有标题的工作表
function createWorkbookWithHeader(worksheet) {
    // 设置列宽
    worksheet.columns = config.langTitle.map((title) => ({
        header: title,
        key: title,
        width: 30 // 您可以根据需要调整列宽
    }));

    // 设置表头样式
    const headerStyle = {
        font: { bold: true, color: { argb: 'FFFFFFFF' } },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0000FF' } },
    };

    // 写入表头并应用样式
    worksheet.getRow(1).eachCell((cell) => {
        cell.style = headerStyle;
    });
}

// 更新 XLSX 文件，保持第一行的样式并从下一行开始插入数据
async function addXLSX(workbook, worksheet, outputFilePath, data) {
    // 插入数据
    data.forEach((value, key) => {
        worksheet.addRow([key, ...Object.keys(value).map((key) => value[key])]);
    });

    await workbook.xlsx.writeFile(outputFilePath);
    console.log(`已添加数据到 XLSX 文件: ${outputFilePath}`);
}

// 更新 XLSX 文件，保持第一行的样式并从下一行开始插入数据
async function updateXLSX(workbook, worksheet, outputFilePath, data) {
    // 创建一个映射，以快速查找现有行
    const existingRowsMap = new Map();
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            // 跳过标题行
            const titleCell = row.getCell(1).value; // 使用列索引
            existingRowsMap.set(titleCell, rowNumber);
        }
    });

    // 插入或更新数据
    data.forEach((value, key) => {
        if (!existingRowsMap.has(key)) {
            // 如果不存在相同的 title，则找到插入位置
            const keyInitial = key.charAt(0);
            let insertRowNumber = 0;

            // 找到与 key 首字母相同的最后一行
            for (let [title, rowNumber] of existingRowsMap) {
                const titleInitial = title ? title.charAt(0) : '';
                if (titleInitial === keyInitial && rowNumber >= insertRowNumber) {
                    insertRowNumber = rowNumber + 1;
                }
            }

            console.log('insertNewRow', insertRowNumber, 'key', key);

            // 插入新行(如果找不到位置默认插入到最后一行)
            worksheet.insertRow(insertRowNumber || worksheet.rowCount + 1, [
                key,
                ...Object.keys(value).map((key) => value[key]),
            ]);

            // 更新 existingRowsMap 以包含新插入的行
            existingRowsMap.set(key, insertRowNumber);

            // 更新从insert位置开始到后面所有受影响的行号
            existingRowsMap.forEach((rowNum, title) => {
                if (rowNum >= insertRowNumber) {
                    existingRowsMap.set(title, rowNum + 1);
                }
            });
        } else {
            // 如果存在相同的 title，则更新现有行
            const rowNumber = existingRowsMap.get(key);
            const row = worksheet.getRow(rowNumber);
            Object.keys(value).forEach((lang, index) => {
                row.getCell(index + 2).value = value[lang]; // 更新对应列的值，从第二列开始（第一列是标题）
            });
            row.commit(); // 提交更新
        }
    });

    await workbook.xlsx.writeFile(outputFilePath);
    console.log(`已更新 XLSX 文件: ${outputFilePath}`);
}

// 主函数
async function main() {
    let jsonResult =  config.langs;
    let hasEmpty = false;
    Object.keys(jsonResult).forEach((key) => {
        jsonResult[key] = readJSONFile(`${key}.json`) || '';
        if (!jsonResult[key]) {
            hasEmpty = true;
        }
    });

    if (hasEmpty) {
        console.error('读取 JSON 文件时出错。');
        return;
    }

    const result = new Map();

    // 合并 JSON 文件中的数据
    Object.keys(jsonResult.en).forEach((key) => {
        let data = {};
        Object.keys(jsonResult).forEach((lang) => {
            data[lang] = jsonResult[lang][key] || '';
        });
        result.set(key, data);
    });

    getOrCreateWorkbook(result);
}

main();
