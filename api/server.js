// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require("./users/model")

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
    // res.json('foo')
    const { name, bio } = req.body
    Users.insert({ name, bio })
    .then(user => {
        if(!name || !bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            res.status(201).json(user)
        } 
    })
    .catch(err => {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    })
})

// GET /api/users (returns an array of users)
server.get("/api/users", (req, res) => {
    res.json('foo')
})

// GET /api/users/:id (returns the user object with the specified 'id')
server.get("/api/users", (req, res) => {
    res.json('foo')
})

// DELETE /api/users/:id (Removes the user with the specified `id` and returns the deleted user)
server.delete("/api/users/:id", (req, res) => {
    res.json('foo')
})

// PUT /api/users/:id (Updates the user with the specified `id` using data from the `request body`. Returns the modified user)
server.put("/api/users/:id", (req, res) => {
    res.json('foo')
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
