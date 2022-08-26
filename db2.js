//引入依赖
const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");
// 创建数据库连接
const sequelize = new Sequelize(
  "ifengVane-origin-database", // 数据库
  MYSQL_USERNAME, // 用户名
  MYSQL_PASSWORD, // 密码
  {
    host, // 域名
    port, // 端口
    dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  }
);
console.log("sequelize", sequelize);

//验证是否连接成功
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// 定义数据模型(基于表)
const Feedflow = sequelize.define("Feedflow", {
  id: {
    type: DataTyps.BIGINT, // 类型
    primaryKey: true, // 主键
    allowNull: false, // 是否为空
  },
  title: {
    type: DataTyps.STRING(50),
    allowNull: false,
  },
  url: {
    type: DataTyps.STRING(100),
    allowNull: false,
  },
});

// 数据库初始化方法
async function init() {
  await Feedflow.sync({
    alter: true, // force:为true时强制删除表 alter：为true时更新表字段
  });
}

// 导出初始化方法和模型
module.exports = {
  init,
  Feedflow,
};
