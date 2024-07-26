import http from "http";
import fs from "fs";
import { exec } from "child_process";
import { dayjs } from "element-plus";
import { isObject } from "radash";

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
function parse(data) {
  return JSON.parse(data);
}
function formatLog(logObject) {
  let logEntries = [];

  // Add the main log details
  logEntries.push(`path: ${logObject.path}`);
  logEntries.push(`message: ${logObject.message}`);
  logEntries.push(`status: ${logObject.status}`);
  logEntries.push(`type: ${logObject.type}`);
  logEntries.push(`targetName: ${logObject.targetName}`);
  logEntries.push(
    `timestamp: ${dayjs(logObject.timestamp).format("YYYY-MM-DD HH:mm:ss")}`
  );

  // Add the scope details
  for (const [key, value] of Object.entries(logObject.scope)) {
    let scopeDetails = `${key}: `;
    for (const [subKey, subValue] of Object.entries(value)) {
      ["entryTime", "exitTime", "entryTime"].includes(subKey)
        ? (scopeDetails += `${subKey}: ${dayjs(subValue).format(
            "YYYY-MM-DD HH:mm:ss"
          )} `)
        : (scopeDetails += `${subKey}: ${subValue} `);
    }
    logEntries.push(scopeDetails.trim());
  }

  return logEntries.join(" "); //'\n'
}

// 定义日志写入函数
function record(data) {
  fs.appendFile("log.txt", data + "\n", (err) => {
    if (err) throw err;
    console.log(`record log.txt in ${new Date().toLocaleString()}`);
  });
}

function welcome(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(`
      light way to record your actions server <br/> 
      比如在哪个时间做了哪些事情点击了哪些按钮触发了哪些事件掉了哪些接口产生了哪些错误等。<br/>
      这是一个简单的尝试，不想引入过多的依赖，如果想尝试更多可用express等 <br />
      上报接口 method：post  http://127.0.0.1:9002/logger
    `);
}
function logger(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    try {
      const log = JSON.parse(body);
      const str = formatLog(log);

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
const controller_map = {
  "/": welcome,
  "/log": logger,
};

function createServer() {
  http
    .createServer(
      (req, res) => controller_map[req.url] && controller_map[req.url](req, res)
    )
    .listen(
      9002,
      console.log(
        "日志服务: http://127.0.0.1:9002 Ads Poster 服务: http://127.0.0.1:9000"
      )
    );
}

function main() {
  createServer();
  process.env.LOGGER_SERVER_OPEN = true;
  runCommand("npm run dev");
}

main();
