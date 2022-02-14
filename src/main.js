
const mongoose = require('mongoose')
const app = require('./app/index')
const { APP_PORT,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_USER,
  MONGODB_PWD,
  MONGODB_DB } = require('./config/config')

const uri = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`;

mongoose.connect(uri).then((res, err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connect successfully');
  }
})

// MongoDB不会重新连接，需要处理之后的错误事件
mongoose.connection.on('error', err => {
  console.error(err);
})

app.listen(APP_PORT, () => {
  console.log(`server is running on http://localhost:${APP_PORT}`)
})