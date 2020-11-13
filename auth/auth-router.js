const router = require('express').Router();
const Users = require('../users/users-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secretCode = require('./secret')


router.post('/register', (req, res) => {
  // implement registration
  if(isValid(req.body)){
    const hash = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hash

    Users.add(req.body)
      .then(user => {
        res.status(201).json({ data: user })
      })
      .catch(error => {
        res.status(500).json({ message: 'Hey we cannot create your account' })
      })
  } else {
    res.status(400).json({
      message: "Please provide correct username and password"
    })
  }
});

// router.post('/login', (req, res) => {
//   if(isValid(req.body)){

//     const { username, password } = req.body
  
//     Users.findBy({ username })
//       .then((user) => {
//         if(user && bcrypt.compareSync(password, user.password)){
//           const token = createToken(user)
//           res.status(200).json({ message: 'Welcome my friend', payload: token })
//         } else {
//           res.status(401).json({ message: "Invalide credentials" })
//         }
//       })
//       .catch(error => {
//         res.status(500).json({ message: 'Cannot find username' })
//       })
//   } else {
//     res.status(400).json({ message: 'Please provide correct username and password' })
//   }
//   // implement login

// });

router.post('/login', (req, res) => {

  const { username, password } = req.body

  if(isValid(req.body)){
     // find and match with username in db
     Users.findBy({ username: username })
        .then(([user]) => {

           if(user && bcrypt.compareSync(password, user.password)){
  
              const token = createToken(user)


              res.status(200).json({ message: "Welcome my friend!", payload: token})
           } else {
              res.status(401).json({ message: 'Invalid credentials' })
           }
        })
        .catch(error => {
           res.status(500).json({ message: error.message })
        })
  } else {
     res.status(400).json({
        message: "Please provide username and password"
     })
  }
})

function isValid(user) {
  return Boolean(user.username && user.password && typeof user.password === "string");
}

function createToken(user){
  const payload = {
    subject: user.id,
    username: user.username,
  }

  const options = {
    expiresIn: '300 seconds'
  }

  return jwt.sign(payload, secretCode.secretCode, options)
}

module.exports = router;
