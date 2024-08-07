import {defineFakeRoute} from "vite-plugin-fake-server/client";
import {faker} from "@faker-js/faker/locale/zh_CN";

export default defineFakeRoute([
    {
        url: "/api/property/search-by-paging",
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        response: ({body}) => {
            const {name,address,currentPage, pageSize} = body;
            const list = Array.from({length: 55}).map((_, index) => ({
                id: index + 1,
                name: faker.helpers.arrayElement(["business", "brand", "pop"]),
                images: faker.image.avatar(),
                address1: faker.location.streetAddress(),
                address2: faker.location.secondaryAddress(),
                city: faker.location.city(),
                stateProvince: faker.location.state(),
                countryRegion: faker.location.country(),
                zipCode: faker.location.zipCode(),
                rentableArea: faker.number.int(24),
                description: faker.commerce.productDescription(),
            }))
            const start = (currentPage - 1) * pageSize;
            return {
                "code": 0,
                "msg": "OK",
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