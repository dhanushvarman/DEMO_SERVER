const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const mongoClient = mongodb.MongoClient;

app.use(cors({
    origin: "*",
}));

app.use(express.json());

app.get('/',(req,res)=>{
    res.json({message : "Connected"})
});

// Create
app.post('/create', async (req, res) => {
    try {
        // connect Database
        const connection = await mongoClient.connect(process.env.DB);

        // select Db
        const db = connection.db("CRUD");

        // select collection and do CRUD
        const user = await db.collection("users").insertOne(req.body);

        // Close connection
        await connection.close();

        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something Went Wrong"});
    }
});

// Read
app.get('/read',async (req,res)=>{
    try {
        // connect Database
        const connection = await mongoClient.connect(process.env.DB);

        // select Db
        const db = connection.db("CRUD");

        // select collection and do CRUD
        const user = await db.collection("users").find({}).toArray();

        // Close connection
        await connection.close();

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something Went Wrong"});
    }
});

// Getting single User
app.get('/user/:id',async (req,res)=>{
    try {

        const { id } = req.params;
        const userId = new mongodb.ObjectId(id);

        // connect Database
        const connection = await mongoClient.connect(process.env.DB);

        // select Db
        const db = connection.db("CRUD");

        // select collection and do CRUD
        const user = await db.collection("users").findOne({ _id: userId });

        // Close connection
        await connection.close();

        res.json(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something Went Wrong"});
    }
});

//update
app.put('/update/:id',async (req,res)=>{
    try {

        const { id } = req.params;
        const userId = new mongodb.ObjectId(id);

        const {firstName , lastName, age, pincode, district } = req.body;

        // connect Database
        const connection = await mongoClient.connect(process.env.DB);

        // select Db
        const db = connection.db("CRUD");

        // select collection and do CRUD
        const user = await db.collection("users").updateOne({_id : userId },{$set : {firstName : firstName, lastName : lastName, age : age, pincode : pincode, district : district}});

        // Close connection
        await connection.close();

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something Went Wrong"});
    }
})


app.listen(3000);