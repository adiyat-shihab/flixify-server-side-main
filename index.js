const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

require("dotenv").config();

const uri = `mongodb+srv://${process.env.Mongo_UserName}:${process.env.Mongo_Password}@cluster0.hzlter2.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("userDB");
    const users = database.collection("users");
    const netflixCollection = client.db("brandDB").collection("Netflix");
    const disneyCollection = client.db("brandDB").collection("disney");
    const warnerbrosCollection = client.db("brandDB").collection("warnerbros");
    const amazonprimeCollection = client
      .db("brandDB")
      .collection("amazonprime");
    const spotifyCollection = client.db("brandDB").collection("spotify");
    const sonyCollection = client.db("brandDB").collection("sony");
    const productStorage = client.db("brandDB").collection("productstorage");

    app.post("/product", async (req, res) => {
      const products = req.body;
      console.log(products);
      const result = await productStorage.insertOne(products);
      res.send(result);
    });

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productStorage.deleteOne(query);
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const cursor = productStorage.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/netflix/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await netflixCollection.findOne(query);
      res.send(result);
    });

    app.get("/netflix", async (req, res) => {
      const cursor = netflixCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/disney", async (req, res) => {
      const cursor = disneyCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/spotify", async (req, res) => {
      const cursor = spotifyCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/warnerbros", async (req, res) => {
      const cursor = warnerbrosCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/sony", async (req, res) => {
      const cursor = sonyCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/amazonprime", async (req, res) => {
      const cursor = amazonprimeCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/netflixpost", async (req, res) => {
      const product = req.body;
      console.log(product);
      const result = await netflixCollection.insertOne(product);
      res.send(result);
    });
    app.post("/disneypost", async (req, res) => {
      const product = req.body;
      console.log(product);
      const result = await disneyCollection.insertOne(product);
      res.send(result);
    });
    app.post("/warnerbrospost", async (req, res) => {
      const product = req.body;
      console.log(product);
      const result = await warnerbrosCollection.insertOne(product);
      res.send(result);
    });
    app.post("/amazonprimepost", async (req, res) => {
      const product = req.body;
      console.log(product);
      const result = await amazonprimeCollection.insertOne(product);
      res.send(result);
    });
    app.post("/spotifypost", async (req, res) => {
      const product = req.body;
      console.log(product);
      const result = await spotifyCollection.insertOne(product);
      res.send(result);
    });
    app.post("/sonypost", async (req, res) => {
      const product = req.body;
      console.log(product);
      const result = await sonyCollection.insertOne(product);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
