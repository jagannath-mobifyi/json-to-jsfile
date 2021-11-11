const fs = require('fs')
const express = require('express');
const cors = require('cors');
const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json())

app.post("/fs", (req, res) => {
    const filename = req.body.filename || "config.js";
    var editor = fs.createWriteStream(filename);
    if(!req.body.data){
        res.json({
            message: "Bad Request!",
            code: 400
        }).status(400)
    }

    const data = req.body.data;

    // Loop every keys
    Object.keys(data).forEach((key) => {
        // Append the text into the content
        editor.write(`export const ${key} = "${data[key]}";\n`)
    });

    // Save everything and create file
    editor.end();
    const file = __dirname + "/" + filename
    console.log(file)
    res.send(file).status(200)
})

app.listen(PORT, (err)=>{
    if(err){
        console.error(err)
    }else{
        console.log("Your app is running on port: ",PORT)
    }
})