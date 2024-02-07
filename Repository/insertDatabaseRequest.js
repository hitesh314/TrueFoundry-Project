const client = require('../connection')
exports.insertUserRequest = (parameters) => {
  parameters[2] = parameters[2].map((val) => {
    if (isNaN(val)) {
        return val.replaceAll("'", '"');
    } else {
        return val;
    }
  });
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