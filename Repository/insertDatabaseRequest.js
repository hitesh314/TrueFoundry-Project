const client = require('../connection')
exports.insertUserRequest = (parameters) => {

  var query = `INSERT INTO ${parameters[0]}
  (${parameters[1].join(', ')})
  VALUES ('${parameters[2].join("', '")}')`;

  client.query(query, (err, result) => {
    if (err) {
      throw err;
    } else {
      return;
    }
  });
}