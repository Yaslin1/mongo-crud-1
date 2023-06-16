

import { MongoClient,ObjectId }from "mongodb";   //import client, letting us access another object
import { mongoURI} from "./secrets.js"; //import credentials

const dbName = "c11-practice";   //variable for db name
const collectionName = "my-second"; // varilable for collection name

const mongoConnect = new MongoClient(mongoURI); //Create a new client and get credentials in secrets folder
await mongoConnect.connect();    //Connect to the mongo service
const db = mongoConnect.db(dbName); // Connect to the database

const dataDocument = {  //adding this objecto to the database
    "id": 10,
    "name": "Scallion",
    "price": 0.99,
    "type": "produce",
    "isBought": true
};

//CRUD Create
const resultInsert = await db.collection(collectionName).insertOne({dataDocument}); // Send a query 

//CRUD READ
const resultRead = await db.collection(collectionName)
.find({})
.limit(10)
.toArray();

//CRUD DELETE
const resultDelete = await db.collection(collectionName)
.deleteOne( {_id: new ObjectId("648b6decc9764dd486273607")});

//CRUD Update
const resultUpdate = await db.collection(collectionName)
.updateOne ( 
    {_id: new ObjectId("648b5bc6e99a587a7cef9cd1")},
    { $set: {name: "Update Name"} }
    );
  

console.log(resultInsert);
console.log(resultDelete);
console.log(resultUpdate);
mongoConnect.close(); //sever the connections 