微服务
authServer : 模仿oauth2服务器的实现
userServer ：模仿用户服务器的实现
config ：环境配置文件
server : 主要api-gateway入口
- routes 路由代理映射表
- proxy 代理配置
- middleware 帮助proxy验证token，若token无效直接抛出401 client去oauth授权，如果有效则根据scopes权限范围代理到响应端点
- config 配置加载文件会动态加载启动指定环境的配置文件
- ratelimit 限流
- logging 日志
- creditCheck 信用检查
