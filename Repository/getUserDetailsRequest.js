const client = require("../connection");

exports.getUserDetails = async (parameters) => {
    const fields = parameters[1];
    const values = parameters[2];
    const operators = parameters[3];
    const whereConditions = fields
        .map((field, index) => `${field} ${operators[index]} '${values[index]}'`)
        .join(" AND ");
    var getUserQuery = `SELECT * FROM ${parameters[0]} Where ${whereConditions}`;
    var getUserCount =  `SELECT COUNT(*) AS user_count FROM ${parameters[0]}`;
    try {
        const userDetails = await new Promise((resolve, reject) => {
            client.query(getUserQuery, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
        const totalUsers = await new Promise((resolve, reject) => {
          client.query(getUserCount, (err, result) => {
              if (err) reject(err);
              else resolve(result);
          });
      });
        console.log(userDetails);
        return {userDetails, totalUsers}; 
    } catch (error) {
        console.error("Error executing query:", error);
        throw error; 
    }
}
