const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/crudoperations")
.then(() => {
    console.log("MongoDB connected");
    // Add sample data if collection is empty
    UserModel.countDocuments().then(count => {
        if (count === 0) {
            UserModel.insertMany([
                { name: "John Doe", email: "john@example.com", age: 25 },
                { name: "Jane Smith", email: "jane@example.com", age: 30 },
                { name: "Bob Johnson", email: "bob@example.com", age: 35 }
            ]).then(() => console.log("Sample users added"))
            .catch(err => console.log("Error adding sample users:", err));
        }
    });
})
.catch(err => console.log(err))


app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err))
})

app.get("/", (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err))
})

app.get("/getUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err))
})

app.put("/updateUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err))
})

app.delete("/deleteUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err))
})


app.listen(3001, '0.0.0.0', ()=>{
    console.log("server is running on port 3001")
})
