module.exports = {
  postList: (req, res) => {
      res.send("postList");
  },

  postOne: (req, res) => {
      res.send("postOne");
  },

  registerPost: (req, res) => {
      res.send("registerPost");
  },

  modifyPost: (req, res) => {
    res.send("updatePost");
  },

  applyPost: (req, res) => {
    res.send("applyPost");
  },

  cancleApplyPost: (req, res) => {
    res.send("cancleApplyPost");
  },

  deletePost: (req, res) => {
    res.send("deletePost");
  },
}

