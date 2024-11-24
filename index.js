const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { restart } = require("nodemon");

// const uri = `mongodb+srv://fareesConstruction:DxjzOg55MBA0z8cV@cluster0.vu7vy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// // console.log(uri);
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// MongoDB connection
const uri =
  // "mongodb+srv://test:Sy1jVRk6xzBeJsq3@cluster0.disah5t.mongodb.net/";
  // "mongodb+srv://fareesConstruction:DxjzOg55MBA0z8cV@cluster0.disah5t.mongodb.net/";
  "mongodb+srv://fareesConstruction:DxjzOg55MBA0z8cV@cluster0.vu7vy.mongodb.net/";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db, usersCollection;

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("TestDB"); // Replace <dbname> with your database name
    usersCollection = db.collection("users"); // Replace 'users' with your collection name
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
connectDB();
async function run() {
  try {
    // DATA COLLECTION
    const homeAboutCollection = client.db("farees").collection("homeAbout");
    const weBuildCollection = client.db("farees").collection("weBuild");
    const recentWorksCollection = client.db("farees").collection("recentWorks");
    const achievementsCollection = client
      .db("farees")
      .collection("achievement");
    const clientCollection = client.db("farees").collection("client");
    const certificatesCollection = client
      .db("farees")
      .collection("certificates");
    const missionVisionCollection = client
      .db("farees")
      .collection("missionVision");
    const areaActivitesCollection = client
      .db("farees")
      .collection("areaActivites");
    const csrCollection = client.db("farees").collection("csr");
    const galleryCollection = client.db("farees").collection("gallery");
    const careerCollection = client.db("farees").collection("career");
    const teamCollection = client.db("farees").collection("team");

    /*---------------------------------------------------
                 HOME
    -------------------------------------------------------*/

    // HOME ABOUT API
    // app.get("/home-about", async (req, res) => {
    //   const result = await homeAboutCollection.find().toArray();
    //   res.send(result);
    // });

    app.get("/users", async (req, res) => {
      try {
        if (!usersCollection) {
          throw new Error("usersCollection is not initialized");
        }
        const users = await usersCollection.find({}).toArray();
        res.send(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ error: "Internal server error" });
      }
    });

    app.get("/home-about", async (req, res) => {
      try {
        const result = await homeAboutCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching home-about:", error);
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });

    app.patch("/home-about/:id", async (req, res) => {
      const id = req.params.id;
      const { description, additionalInfo } = req.body;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: { description, additionalInfo },
      };
      try {
        const result = await homeAboutCollection.updateOne(query, updateDoc);
        console.log(result);
        res.send(result);
      } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send({ error: "Failed to update data" });
      }
    });

    // ***********************************
    //      We Build section
    //************************************

    app.get("/weBuild", async (req, res) => {
      const result = await weBuildCollection.find().toArray();
      res.send(result);
    });

    //add service in db
    app.post("/weBuild", async (req, res) => {
      const webuildData = req.body;
      const result = await weBuildCollection.insertOne(webuildData);
      res.send(result);
    });

    // UPDATW WE BUILD
    app.patch("/weBuildUpdate/:id", async (req, res) => {
      const id = req.params.id;
      const { description, title, image } = req.body;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: { description, title, image },
      };
      try {
        const result = await weBuildCollection.updateOne(query, updateDoc);
        console.log(result);
        res.send(result);
      } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send({ error: "Failed to update data" });
      }
    });

    //Delete service data
    app.delete("/weBuildDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await weBuildCollection.deleteOne(query);
      res.send(result);
    });

    // ***********************************
    //        Recent Works
    //************************************

    // project & recent work
    app.get("/recentWorks", async (req, res) => {
      const result = await recentWorksCollection.find().toArray();
      res.send(result);
    });

    // update
    app.patch("/recentWorksUpdate/:id", async (req, res) => {
      const id = req.params.id;
      const { backgroundimg, name } = req.body;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: { backgroundimg, name },
      };
      try {
        const result = await recentWorksCollection.updateOne(query, updateDoc);
        console.log(result);
        res.send(result);
      } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send({ error: "Failed to update data" });
      }
    });

    // ***********************************
    //       Achivement
    //************************************
    app.get("/achive", async (req, res) => {
      const result = await achievementsCollection.find().toArray();
      res.send(result);
    });

    // ***********************************
    //       Client section
    //************************************
    app.get("/clients", async (req, res) => {
      const result = await clientCollection.find().toArray();
      res.send(result);
    });

    /*---------------------------------------------------
                 About Page
    -------------------------------------------------------*/

    //Mission Vision

    app.get("/missionVision", async (req, res) => {
      const result = await missionVisionCollection.find().toArray();
      res.send(result);
    });

    // update
    app.patch("/missionVisionUpdate/:id", async (req, res) => {
      const id = req.params.id;
      const { title, description } = req.body;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
      }
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: { title, description },
      };
      try {
        const result = await missionVisionCollection.updateOne(
          query,
          updateDoc
        );
        res.send(result);
      } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).send({ error: "Failed to update data" });
      }
    });

    // // Certificates
    // app.get('/certificates', async (req, res) => {
    //   const result = await certificatesCollection.find().toArray()
    //   res.send(result)
    // });
    app.get("/certificates", async (req, res) => {
      const result = await certificatesCollection.find().toArray();
      res.send(result);
    });

    //add Certificates in db
    app.post("/certificates", async (req, res) => {
      const certificates = req.body;
      const result = await certificatesCollection.insertOne(certificates);
      res.send(result);
    });

    //Delete Certificates  data
    app.delete("/certificatesDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await certificatesCollection.deleteOne(query);
      res.send(result);
    });

    /*---------------------------------------------------
              Area Of Activites
    -------------------------------------------------------*/

    app.get("/areaActivites", async (req, res) => {
      const result = await areaActivitesCollection.find().toArray();
      res.send(result);
    });

    app.post("/areaActivites", async (req, res) => {
      const areaActivitesData = req.body;
      const result = await areaActivitesCollection.insertOne(areaActivitesData);
      res.send(result);
    });

    //Delete Area Activities  data
    app.delete("/areaActivitesDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await areaActivitesCollection.deleteOne(query);
      res.send(result);
    });

    /*---------------------------------------------------
                       Project Page
       -------------------------------------------------------*/
    app.post("/projects", async (req, res) => {
      const projectData = req.body;
      const result = await recentWorksCollection.insertOne(projectData);
      res.send(result);
    });

    //Delete Area Activities  data
    app.delete("/projectDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await recentWorksCollection.deleteOne(query);
      res.send(result);
    });

    /*---------------------------------------------------
                           CSR Page
     -------------------------------------------------------*/
    app.get("/csrs", async (req, res) => {
      const result = await csrCollection.find().toArray();
      res.send(result);
    });

    app.post("/csrs", async (req, res) => {
      const projectData = req.body;
      const result = await csrCollection.insertOne(projectData);
      res.send(result);
    });
    //Delete Area Activities  data
    app.delete("/csrDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await csrCollection.deleteOne(query);
      res.send(result);
    });

    /*---------------------------------------------------
                         Career Page
     -------------------------------------------------------*/
    app.get("/jobs", async (req, res) => {
      const result = await careerCollection.find().toArray();
      res.send(result);
    });

    // Job details
    app.get("/jobs/:id", async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ObjectId format" });
      }

      try {
        const result = await careerCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!result) {
          return res.status(404).send({ message: "Job not found" });
        }
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    app.post("/job", async (req, res) => {
      const projectData = req.body;
      const result = await careerCollection.insertOne(projectData);
      res.send(result);
    });

    //Delete Area Activities  data
    app.delete("/jobDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await careerCollection.deleteOne(query);
      res.send(result);
    });

    /*---------------------------------------------------
                          Gallery Page
     -------------------------------------------------------*/

    app.get("/gallery", async (req, res) => {
      const result = await galleryCollection.find().toArray();
      res.send(result);
    });

    app.post("/gallery", async (req, res) => {
      const projectData = req.body;
      const result = await galleryCollection.insertOne(projectData);
      res.send(result);
    });

    //Delete Area Activities  data
    app.delete("/galleryDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await galleryCollection.deleteOne(query);
      res.send(result);
    });

    /*---------------------------------------------------
                  Team    Member Page
     -------------------------------------------------------*/
    app.get("/team", async (req, res) => {
      const result = await teamCollection.find().toArray();
      res.send(result);
    });

    app.post("/team", async (req, res) => {
      const projectData = req.body;
      const result = await teamCollection.insertOne(projectData);
      res.send(result);
    });

    //Delete Area Activities  data
    app.delete("/memberDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await teamCollection.deleteOne(query);
      res.send(result);
    });

    //await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Farees is Running");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
