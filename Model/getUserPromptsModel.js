const getUserRepository = require('../Repository/getUserDetailsRequest')

exports.getUserPromptsRequests = async (userId, timePeriod) => {
  const tableName = 'users_requests';
  const tableColumns = [
    'user_reference_id',
  ];
  const queryInputValues = [ 
    userId,
    `CURRENT_DATE - INTERVAL ${timePeriod} DAY;`
  ];
  const operatorsValues = [
    '=',
    '>='
  ];

  const userDetails = await getUserRepository.getUserDetails([tableName,
    tableColumns,
    queryInputValues,
    operatorsValues]);

  return userDetails;
}