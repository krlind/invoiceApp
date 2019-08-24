const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (req, res, next) => {
  try{
    const users = await User.find({})
    res.json(users.map(user => user.toJSON()))
  }catch (exception) {
  next(exception)
}

})

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body

    if(body.username.length < 3 || body.password.length < 3){
      res.status(500).json({error: 'Invalid password or username'}).end()

    } else {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })
      const savedUser = await user.save()
      res.json(savedUser)
    }


  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter