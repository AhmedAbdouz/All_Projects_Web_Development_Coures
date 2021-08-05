const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });



const fruitschema = new mongoose.Schema({
    name: String,
    rating: Number
})
const Fruit = mongoose.model('fruit', fruitschema);

const apple = new Fruit({
    name: "Apple",
    rating: 10
})

const peopleschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favFruit: fruitschema
});

// apple.save();

const People = mongoose.model('people', peopleschema);

const adel = new People({
    name: "Ahmed",
    age: 5,
});

// adel.save();


People.find(function(err, x) {
    if (err)
        console.log(err);
    else {
        x.forEach(element => {
            console.log(element.name);
        });
    }
    console.log(x);
    mongoose.connection.close();
})

People.deleteMany({ name: "hussien" }, function(err) {});

People.updateOne({ name: "Ahmed" }, { favFruit: apple }, function() {});

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'fruitsDB';

// // Create a new MongoClient
// const client = new MongoClient(url, { useUnifiedTopology: true });

// // Use connect method to connect to the Server
// client.connect(function(err) {
//     assert.equal(null, err);


//     console.log("Connected successfully to server");

//     const db = client.db(dbName);

//     findDocuments(db, function() {
//         client.close();
//     });
// });

// const insertDocuments = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('fruits');
//     // Insert some documents
//     collection.insertMany([{
//             name: "Apple",
//             score: 8,
//             review: "Great Fruit"
//         },
//         {
//             name: "Orange",
//             score: 6,
//             review: "Sour"
//         },
//         {
//             name: "Banana",
//             score: 9,
//             review: "Great stuff!"
//         }
//     ], function(err, result) {
//         assert.equal(err, null);
//         assert.equal(3, result.result.n);
//         assert.equal(3, result.ops.length);
//         console.log("Inserted 3 documents into the collection");
//         callback(result);
//     });
// }

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Find some documents
    collection.find({}).toArray(function(err, fruits) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits)
        callback(fruits);
    });
}