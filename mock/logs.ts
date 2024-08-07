import {defineFakeRoute} from "vite-plugin-fake-server/client";
import {faker} from "@faker-js/faker/locale/zh_CN";

export default defineFakeRoute([
    {
        url: "/api/logs/search-by-paging",
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        response: ({body}) => {
            const {propertyName,templateName,status,type, currentPage,startTime,endTime,platformName, pageSize} = body;
            console.log('body---',body)
            const list = Array.from({length: 55}).map((_, index) => ({
                id: index + 1,
                propertyId: faker.number.int(),
                propertyName: faker.helpers.arrayElement(["business", "brand", "pop"]),
                companyTemplateId: faker.number.int(),
                companyTemplateName: faker.helpers.arrayElement(["cubework", "item", "hemashengxian"]),
                platformName: faker.helpers.arrayElement(["taobao", "tianbao", "jingdong"]),
                typeName: faker.helpers.arrayElement(["Manual", "Automatic"]),
                type: faker.helpers.arrayElement(["0", "1"]),
                statusName: faker.helpers.arrayElement(["Success", "Fail"]),
                status: faker.helpers.arrayElement(["0", "1"]),
                publishDatetime: faker.date.past(),
            }))
            const start = (currentPage - 1) * pageSize;
            return {
                code: 200,
                success: true,
                data: {
                    totalCount: list.length,
                    list: list.splice(start, pageSize),
                    pageSize: 10, // 每页显示条目个数
                    currentPage: 1, // 当前页数
                    totalPage: Math.ceil(list.length / pageSize)
                }
            }
        }
    }
])