const config = {
	// 生成/更新表格默认参照的语言文件
	defaultLang: 'en',
	// 支持的多语言项，配置后locales下要有对应的json文件如：en.json, es.json...（新增多语言项需要在这里添加）
	langs: { en: {}, es: {}, zh: {}, tw: {}, ko: [], ja: [], ar: [] },
	// 如果不存在表格，会按以下标题顺序生成多语言表格（新增多语言项需要在这里添加）
	// 除了title第一个, 语言标题顺序与langs保持一致不能错乱（en=》English，es=>Spanish ...）
	langTitle: [
		'Title',
		'English',
		'Spanish',
		'Simplified Chinese',
		'Traditional Chinese',
		'Korean',
		'Japanese',
		'Arabic',
	],
	// 需要提取/生成的xlsx表格名称
	xlsxFile: 'Multiple languages.xlsx',
	// 需要提取/更新插入数据的子表名称
	sheetName: 'Item-Pass（Web）',
	fileId:'1yDX8-RbcK7R5HCSVd70NSUJiIoX6hpCPOVUf2SCigD0',
	gid:'295134178',
};

export default config;
