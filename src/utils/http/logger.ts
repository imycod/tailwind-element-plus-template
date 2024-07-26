export function logger(error) {
  const response = error.response;
  const data = {
    path: response.config.url,
    message: response.data.message || error.message,
    status: response.status,
  };
  http.post("/local/logger", {
    data,
  });
}
