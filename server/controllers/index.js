// const models = require('../models');

module.exports = {
  user: {
    get: (req, res) => {
      res.send("user server test")
    }
  },
  post: {
    get: (req, res) => {
     res.send("post server test")
    }
  }
};
