const db = require('../db');

// db에서 가져옴 db sequelize method

// callback function
// (error, result) => {
//   if (error) {
//     res.status(500).send('Internal Server Error');
//   } else {
//     res.status(200).json(result);
//   }
// }

module.exports = {
  items: {
    get: (callback) => {
      // TODO: Cmarket의 모든 상품을 가져오는 함수를 작성하세요
      const queryString = `SELECT * FROM items`;

      db.query(queryString, (error, result) => {
        callback(error, result);
      });
    },
  },
  orders: {
    get: (userId, callback) => {
      // TODO: 해당 유저가 작성한 모든 주문을 가져오는 함수를 작성하세요
      const queryString = `SELECT orders.id, orders.created_at, orders.total_price, items.name, items.price, items.image, order_items.order_quantity FROM items
      INNER JOIN order_items ON (order_items.item_id = items.id)
      INNER JOIN orders ON (orders.id = order_items.order_id)
      WHERE (orders.user_id = ?)`;

      const params = [userId];

      db.query(queryString, params, (error, result) => {
        callback(error, result);
      });
    },
    post: (userId, orders, totalPrice, callback) => {
      // TODO: 해당 유저의 주문 요청을 데이터베이스에 생성하는 함수를 작성하세요
      const queryString = `INSERT INTO orders (user_id, total_price) VALUES (?, ?)`;
      const params = [userId, totalPrice];

      db.query(queryString, params, (error, result) => {
        if (result) {
          const queryString = `INSERT INTO order_items (order_id, item_id, order_quantity) VALUES ?;`;
          const params = orders.map((order) => [
            result.insertId,
            order.itemId,
            order.quantity,
          ]);

          return db.query(queryString, [params], (error, result) => {
            callback(error, result);
          });
        }
        callback(error, null);
      });
    }
  },
};
