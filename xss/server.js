const http = require("http");
const server = http.createServer();


server.on("request", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader('Set-Cookie', "yummy_cookie=banana; Expires=Wed, 21 Oct 2021 07:28:00 GMT; HttpOnly")
 
  if (req.url === "/") {
      res.end('111')
  }
});

server.listen(3000, () => console.log("正在监听 3000 端口"));
