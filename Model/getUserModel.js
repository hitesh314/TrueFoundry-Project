const getUserRepository = require('../Repository/getUserDetailsRequest')

exports.getUserDetailsByEmail = async (email) => {
  const tableName = 'users';
  const tableColumns = [
    'email',
  ];
  const queryInputValues = [ 
    email
  ];
  const operatorsValues = [
    '='
  ];

  const userDetails = await getUserRepository.getUserDetails([tableName,
    tableColumns,
    queryInputValues,
    operatorsValues]);

  return userDetails;
}

exports.getUserDetailsById = async (userId) => {
  const tableName = 'users';
  const tableColumns = [
    'id',
  ];
  const queryInputValues = [ 
    userId
  ];
  const operatorsValues = [
    '='
  ];

  const userDetails = await getUserRepository.getUserDetails([tableName,
    tableColumns,
    queryInputValues,
    operatorsValues]);
    
  return userDetails;
}