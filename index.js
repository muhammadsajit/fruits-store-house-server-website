const express =require('express');
const app = express();
const cors =require('cors');
const port = process.env.PORT ||5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

//use middleware
app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tjjrs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
         await client.connect();
         const fruitsCollection = client.db('fruitsStore').collection('fruitsItem');
          app.get('/item',async(req,res)=>{
            const query ={};
            const cursor = fruitsCollection.find(query);
            const items = await cursor.toArray();
            res.send(items)
          });
          app.get('/inventory/:id',async(req,res)=>{
             const id=req.params.id ;
             const query={_id:ObjectId(id)};
             const inventory = await fruitsCollection.findOne(query);
             res.send(inventory);
          })
        //   update operation
          app.put('/inventory/:id',async(req,res)=>{
              console.log(req.params.id)
              const id=req.params.id;
              console.log(id)
              const newQuantity =req.body;
              console.log(newQuantity)
              
              const filter={_id:ObjectId(id)};
              const options = { upsert: true };
              const updateDoc={
                  $set:{
                      quantity:newQuantity.quantity
                  }
              };
              const result=await fruitsCollection.updateOne(filter,updateDoc,options);
              res.send(result)

          });
          //post
          app.post('/item',async(req,res)=>{
              const newItem=req.body;
              const result= await fruitsCollection.insertOne(newItem);
              res.send(result)

          })






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