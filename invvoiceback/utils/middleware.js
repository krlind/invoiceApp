const requestLogger = (request, response, next) => {
  console.log('-------------------------------------')
  console.log('Method:        ',  request.method);
  console.log('Path:          ',  request.path);
  console.log('Req Body:      ',  request.body);
  console.log('Autorization:  ',  request.get('authorization'));
  console.log('-------------------------------------')
  next();
};

const tokenExtractor = async (request, response, next) => {
  console.log('MIDDLEWARE')
  console.log('-------------------------------------')
  try{
    const authorization = request.get('authorization')
    
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    } else {
      throw new Error( 'tokenError'  )
    }
    }catch(exception){
      next(exception)
   }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  } else if (error.message === 'tokenError' || error.message === 'invalid token' ){
    response.status(401).json({ error: 'token missing or invalid' })
  } else if (error.message === 'userUnauthorized'){
    response.status(401).json({ error: 'user unautorized' })
  } else if (error.message === 'badRequest'){
    response.status(400).json({ error: 'validation error' })
  }

  console.error('-----------------------------------------')
  console.error('error handling:', error.message || error )
  console.error('-----------------------------------------')

  next(error)
}




module.exports = {
  requestLogger, 
  tokenExtractor,
  errorHandler,
  unknownEndpoint

}