import http from 'http';
import fs from 'fs';

// 定义日志写入函数
function writeLogger(data) {
  fs.appendFile('log.txt', data + '\n', (err) => {
    if (err) throw err;
    console.log('数据已追加到 log.txt');
  });
}

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  if (req.url === '/logger' && req.method === 'POST') {
    let body = '';

    // 监听data事件，收集请求体的数据
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // 监听end事件，当所有数据接收完毕后进行处理
    req.on('end', () => {
      try {
        console.log('body--',body)
        // 调用写入日志函数
        writeLogger(body);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({
          message: 'write logger success',
          code: 200
        }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(SON.stringify({
          message: 'write logger error',
        }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify({
      message: 'logger path error',
    }));
  }
});

// 监听9002端口
server.listen(9002, () => {
  console.log('服务器正在监听9002端口');
});
