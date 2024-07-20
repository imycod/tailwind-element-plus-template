import Cookies from "js-cookie";
import {storageLocal} from "@pureadmin/utils";

const TokenKey = 'token'
const userKey = 'userInfo'

export function getToken() {
	// 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
	return Cookies.get(TokenKey)
		? JSON.parse(Cookies.get(TokenKey))
		: storageLocal().getItem(userKey);
}