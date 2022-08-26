const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const { init: initDB, Counter } = require("./db");
const { init: initDB, Feedflow } = require("./db2");

const logger = morgan("tiny");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); // 跨域
app.use(logger); // 日志打印

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// // 更新计数
// app.post("/api/count", async (req, res) => {
//   const { action } = req.body;
//   if (action === "inc") {
//     await Counter.create();
//   } else if (action === "clear") {
//     await Counter.destroy({
//       truncate: true,
//     });
//   }
//   res.send({
//     code: 0,
//     data: await Counter.count(),
//   });
// });

// // 获取计数
// app.get("/api/count", async (req, res) => {
//   const result = await Counter.count();
//   res.send({
//     code: 0,
//     data: result,
//   });
// });

// 测试：轮播图数据
app.get("/api/feedflow", async (req, res) => {
  console.log("请求", req);
  console.log("响应", res);
  const feedflows = await Feedflow.Feedflow();
  console.log("All feedflows", feedflows);
  res.send({
    code: 0,
    data: feedflows,
  });
});

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

// 监听端口
const port = process.env.PORT || 80;
// 启动数据库
async function bootstrap() {
  await initDB(); // 初始化数据库

  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
