/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");


/** Generate text from markov machine */

function generateText (text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

/** read a file and make text */

function makeText(path){
    fs.readFileSync(path, "utf8", function cb(err, data){
        if (err) {
            console.error(`Error reading: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

/** read url and make text */

async function makeURLText(url){
    let resp;

    try{
        resp = await axios.get(url);

    } catch (err){
        console.error(`Can't read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data);
}

/** interpret cmdline */

let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);
}
else if (method === "url") {
    makeURLText(path);
}
else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}
