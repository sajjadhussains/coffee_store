const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

const port = process.env.PORT || 5000;

//coffeeMaster
//J1UhSXswwr7tjNTz
app.use(cors())
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Server is Working");
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2xkdala.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const userCollection = client.db("coffeeUserDb").collection("coffeeUsers");


    app.post('/coffee',async (req,res)=>{
      const newCoffee=req.body;
      console.log(newCoffee.name);
      const result=await userCollection.insertOne(newCoffee);
      res.send(result);
    })

    app.get('/coffee',async(req,res)=>{
        const cursor = userCollection.find();
        const result = await cursor.toArray()
        res.send(result);
    })
    app.get('/coffee/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)}
      const result = await userCollection.findOne(query)
      res.send(result)
    })
    app.put('/coffee/:id',async (req,res)=>{
      const id = req.params.id;
      const filter = {_id:new ObjectId(id)}
      const options = { upsert: true };
      const updatedCoffee=req.body;
      const coffee={
        $set:{
          name:updatedCoffee.name,
          quantity:updatedCoffee.quantity,
          supplier:updatedCoffee.supplier,
          taste:updatedCoffee.taste,
          category:updatedCoffee.category,
          details:updatedCoffee.details,
          photo:updatedCoffee.photo,
        }
      }
      const result = await userCollection.updateOne(filter, coffee, options);
      res.send(result);

    })
    app.post('/coffee/:id',async(req,res)=>{
      const id=req.params.id;
      const query = {_id:new ObjectId(id)};
      const result = await userCollection.findOne(query);
      res.send(result)
    })
    app.delete('/coffee/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:new ObjectId(id)}
      const result = await userCollection.deleteOne(query)
      res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})