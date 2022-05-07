const express =require('express');
const app = express();
const cors =require('cors');
const port = process.env.PORT ||5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

//use middleware
app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tjjrs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
         await client.connect();
         const collection = client.db('fruitsStore').collection('fruitsItem');
         console.log('db is connected')

    }
    finally{
        
    }

}

run().catch(console.dir)
app.get('/',(req,res)=>{
    res.send('Running server')
});

//dbuser
//XCSHm#8pcXu6cPs
//uz7NldACI5xqNHzF
//dbuser1
//6rryXzJHRUSKQqUk
app.listen(port,()=>{
    console.log('listening to port',port)
})