module.exports = {
    mypage: async (req, res) => {
      // const result = await models.users.get();
      // // console.log(result)

      // if (!result) {
      //   return res.status(500).send('Internal Server Error');
      // }

      res.status(200).json('d');
    },

    auth: (req, res) => {
        res.send('a')
    },

    changeInfo: (req, res) => {
        res.send('b')
    },

    deleteInfo: (req, res) => {
        res.send('c')
    }
};
