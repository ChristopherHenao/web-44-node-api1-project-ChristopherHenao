// BUILD YOUR SERVER HERE
const express = require("express")
const Users = require("./users")

const server = express()

server.use(express.json())

// | Method | URL            | Description                                                                                            |
// | ------ | -------------- | ------------------------------------------------------------------------------------------------------ |
// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// | GET    | /api/users     | Returns an array users.                                                                                |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

// POST /api/users (Creates a user)
server.post("/api/users", (req, res) => {
    const { name, bio } = req.body
    Users.insert({ name, bio })
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
