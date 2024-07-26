import { useLoggerStore } from "@/stores/modules/logger.ts";
import {router} from "@/routers"

export function logger(error) {
  const response = error.response;
  const route = router.currentRoute.value
  console.log(route.path)
  const store = useLoggerStore()
  const scope = store.histories.scope
  const current = scope[route.path]
  store.toLogger({
    scope:{
      ...scope,
      [route.path]:{
        ...current,
        error:response.data,
      }
    }
  })
  const histories = useLoggerStore().histories;
  const data = {
    path: response.config.url,
    message: response.data.message || error.message,
    status: response.status,
  };
  http.post("/local/log", {
    data: Object.assign(data, histories),
  });
}
