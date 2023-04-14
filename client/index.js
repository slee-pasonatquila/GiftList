const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const prompt = require("prompt-sync")();

const serverUrl = "http://localhost:1225";

async function main() {
    // Create the merkle tree and get the Root.
    const merkleTree = new MerkleTree(niceList);
    const root = merkleTree.getRoot(); //console.log the root and hardcode it to server side.

    // Ask user input to get the name which will be searched and be sure it is not null.
    const name = prompt("Which name do you want to check?");
    if (name == null) {
        alert("You have to type a name");
    }

    // Find the index of the name and get proof from merkle tree.
    const index = niceList.findIndex((n) => n === name);
    const proof = merkleTree.getProof(index);

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        name,
        proof,
    });

    console.log({ gift });
}

main();
