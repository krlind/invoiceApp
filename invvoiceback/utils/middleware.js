

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if(!authorization){
    return response.status(401).json({ error: 'token missing or invalid'})
  }
  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}




module.exports = {
  tokenExtractor

}