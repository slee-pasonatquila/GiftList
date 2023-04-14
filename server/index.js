const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = "088d3c1ec641306d31cd1e27a5f93ff2d3d9dedd612dadbe731c0d24cdbc7a65";

app.post("/gift", (req, res) => {
    // Grab the parameters from the client side
    const { name, proof } = req.body;

    // Prove that a name is in the list
    const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
    if (isInTheList) {
        res.send("You got a toy robot!");
    } else {
        res.send("You are not on the list :(");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});
