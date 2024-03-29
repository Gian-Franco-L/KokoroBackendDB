const ERROR_HANDLERS = {
  CastError: res =>
    res.status(400).end({ error: 'id used is malformed' }),

  ValidationError: (res, { message }) =>
    res.status(409).end({ error: message }),

  JsonWebTokenError: res =>
    res.status(401).json({ error: 'token missing or invalid' }),

  TokenExpiredError: res =>
    res.status(401).json({ error: 'token expired' }),
  
  defaultError: res => res.status(500).end()
}

module.exports = (error, request, response, next) =>{
  console.error(error);

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(response, error)
}
