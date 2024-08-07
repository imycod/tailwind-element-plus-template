// https://app.apifox.com/project/4939342
export type PageType = {
    currentPage: number,
    pageSize: number,
}

export type DataLogType = PageType & QueryLogType & {
    type: number,
}

// queryForm
export type QueryLogType = {
    propertyName: string,
    templateName: string,
    platformName: string,
    status: number,
    startTime: string,
    endTime: string,
}

export type DataPropertiesType = PageType & {
    name: string,
    address: string,
}

export type DataTemplateType = PageType & {
    name: string,
}