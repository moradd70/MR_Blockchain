const SHA256 = require("crypto-js/sha256");

class Block {
    //Define the constructor properties, 
    constructor(index, timestamp, data, previousHash = '') {
        
        this.index = index;  
        this.previousHash = previousHash; 
        this.timestamp = timestamp; 
        this.data = data; 
        this.hash = this.calculateHash();
    }

    calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class Blockchain{
    //Constructor will intiliaze the blockchain
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "10/01/2018", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let MarocCoin = new Blockchain();
MarocCoin.addBlock(new Block(1, "20/03/2018", { amount: 4 }));
MarocCoin.addBlock(new Block(2, "20/04/2018", { amount: 8 }));
MarocCoin.addBlock(new Block(3, "20/04/2018", { amount: 2 }));
MarocCoin.addBlock(new Block(4, "20/04/2018", { amount: 3 }));
MarocCoin.addBlock(new Block(5, "20/04/2018", { amount: 1 }));


console.log('Blockchain valid? ' + MarocCoin.isChainValid());

console.log('Changing a block...');
MarocCoin.chain[1].data = { amount: 100 };


console.log("Blockchain valid? " + MarocCoin.isChainValid());

//console.log(JSON.stringify(MarocCoin, null, 4)); if you want to view the hashes of each block 