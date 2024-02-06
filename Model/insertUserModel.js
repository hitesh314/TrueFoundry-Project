const insertRepository = require('../Repository/insertDatabaseRequest')

exports.insertUserRequest = (parameters, userId, request, startTime) => {

  const endTime = new Date();
  const tableName = 'users_requests';
  const tableColumns = [
    'user_reference_id',
    'request_status_id',
    'request_value',
    'response_value',
    'input_tokens',
    'output_tokens',
    'response_time'
  ];
  const queryInputValues = [ 
    userId,
    parameters.statusCode,
    request,
    parameters.response,
    parameters.promptTokens,
    parameters.outputTokens, 
    endTime.getTime() - startTime
  ];

  insertRepository.insertUserRequest([tableName,
    tableColumns,
    queryInputValues])
}