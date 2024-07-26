import http from "http";
import fs from "fs";
import { exec } from "child_process";

function runCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, { ...options }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`);
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

function stringify(value) {
  return JSON.stringify(value);
}

// 定义日志写入函数
function record(data) {
  fs.appendFile("log.txt", data + "\n", (err) => {
    if (err) throw err;
    console.log("数据已追加到 log.txt");
  });
}

function createServer() {
  // 创建 HTTP 服务器
  const server = http.createServer((req, res) => {
    if (req.url === "/") {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(`
          light way to record your actions server <br/> 
          比如在哪个时间做了哪些事情点击了哪些按钮触发了哪些事件掉了哪些接口产生了哪些错误等。<br/>
          这是一个简单的尝试，不想引入过多的依赖，如果想尝试更多可用express等 <br />
          上报接口 method：post  http://127.0.0.1:9002/logger
        `);
    }
    if (req.url === "/logger" && req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          let str = "";
          Object.keys(JSON.parse(body)).forEach((key) => {
            str += `${key}: ${JSON.parse(body)[key]} `;
          });
          str += new Date().toLocaleString();

          record(str);

          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(
            stringify({
              message: "write log success",
              code: 200,
            })
          );
        } catch (error) {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(
            stringify({
              message: "write log error",
            })
          );
        }
      });
    }
  });

  // 监听9002端口
  server.listen(9002, () => {
    console.log(
      "日志服务: http://127.0.0.1:9002 Ads Poster 服务: http://127.0.0.1:9000"
    );
  });
}

function main() {
  createServer();
  process.env.LOGGER_SERVER_OPEN = true;
  runCommand("npm run dev");
}

main();
