const insertRepository = require('../Repository/insertDatabaseRequest')

exports.addUserRequest = (userInformation, userId) => {
  const tableName = 'users';
  const tableColumns = [
    'id',
    'name',
    'email',
    'password'
  ];
  const queryInputValues = [ 
    userId,
    userInformation.userFullName,
    userInformation.userEmail,
    userInformation.userPassword
  ];

  insertRepository.insertUserRequest([tableName,
    tableColumns,
    queryInputValues])
}