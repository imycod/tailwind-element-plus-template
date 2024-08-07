import {DataLogType} from "@/apis/types";

export const searchLogs = (data:DataLogType) => http.post("/api/logs/search-by-paging",{data})