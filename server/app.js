const express = require('express');
const indexRouter = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const fs = require('fs');
const https = require('https');
const PORT = 4000;
const db = require('./db/index'); 
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(
  morgan('      :method :url :status :res[content-length] - :response-time ms')
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static('images'))
app.use(cors({
  origin: true,
  credentials: true,
  method: ['get', 'post', 'options', 'delete']
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', indexRouter);
db();

let server;

if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  server = https
    .createServer(
      {
        key: fs.readFileSync(__dirname + `/` + 'key.pem', 'utf-8'),
        cert: fs.readFileSync(__dirname + `/` + 'cert.pem', 'utf-8'),
      },
      app
    )
    .listen(PORT, () => {
      console.log(`Express https server is listening on port ${PORT}`)
    });
} else {
  server = app.listen(PORT, () => {
    console.log(`Express http server is listening on port ${PORT}`)
  })
}
module.exports = server;

// module.exports = app.listen(port, () => {
//   console.log(`      🚀 Server is starting on ${port}`);
// });
