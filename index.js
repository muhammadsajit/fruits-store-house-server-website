const express =require('express');
const app = express();
const cors =require('cors');
const port = process.env.PORT ||5000;

//use middleware
app.use(cors());
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Running server')
});
app.listen(port,()=>{
    console.log('listening to port',port)
})