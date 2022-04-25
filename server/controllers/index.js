const models = require('../models');

module.exports = {
  user: {
    get: (req, res) => {
      models.users.get(req, res);
    }
  },
  post: {
    get: (req, res) => {
     res.send("post server test")
    }
  }
};
