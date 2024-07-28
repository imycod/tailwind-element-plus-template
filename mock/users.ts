import {defineFakeRoute} from "vite-plugin-fake-server/client";
import {faker} from "@faker-js/faker/locale/zh_CN";

export default defineFakeRoute([
	{
		url: "/api/idm-app/users",
		method: "post",
		headers:{
			"Content-Type": "application/json"
		},
		response: ({body}) => {
			const {current,size} = body;
			const list = Array.from({length: 55}).map((_, index) => ({
				id: index + 1,
				name: faker.name.fullName(),
				email: faker.internet.email(),
				avatar: faker.image.avatar(),
				role: faker.helpers.arrayElement(["admin", "editor", "user"])
			}))
			const start = (current - 1) * size;
			return {
				code: 200,
				success: true,
				data: {
					total: list.length,
					list:list.splice(start, size),
					size: 10, // 每页显示条目个数
					currentPage: 1 // 当前页数
				}
			}
		}
	}
])