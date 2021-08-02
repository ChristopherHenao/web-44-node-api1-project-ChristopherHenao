// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require("./users/model")

const server = express()

server.use(express.json())


// Endpoints
// POST /api/users (Creates a user)
server.post("/api/users", (req, res) => {
    const { name, bio } = req.body
    Users.insert({ name, bio })
    .then(user => {
        if(!name || !bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } 
        else {
            res.status(201).json(user)
        } 
    })
    .catch(err => {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    })
})

// GET /api/users (returns an array of users)
server.get("/api/users", (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ message: "The users information could not be retrieved" })
    })
})

// GET /api/users/:id (returns the user object with the specified 'id')
server.get("/api/users/:id", (req, res) => {
    const { id } = req.params
    Users.findById(id)
    .then(user => {
        if(!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } 
        else {
            res.status(200).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The user information could not be retrieved" })
    })
})

// DELETE /api/users/:id (Removes the user with the specified `id` and returns the deleted user)
server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params
    Users.remove(id)
    .then(deleted => {
        if(!deleted) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } 
        else {
            res.status(200).json(deleted)
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The user could not be removed" })
    })
})

// PUT /api/users/:id (Updates the user with the specified `id` using data from the `request body`. Returns the modified user)
server.put("/api/users/:id", (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    Users.update(id, { name, bio })
    .then(user => {
        if  (!name || !bio) {
            res.status(400).json({ message: "provide name and bio" })
        } 
        else if (!user) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } 
        else {
            res.json(user)
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The user information could not be modified" })
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
