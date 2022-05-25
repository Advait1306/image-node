const express = require('express')
const app = express()
const port = 3000

const download = require('image-downloader')

app.get('/api', (req, res) => {
    res.send("Hello")

    console.log(req.query)
    const url = req.query.url
    const options = {
        url: url,
        dest: '../../images/',               // will be saved to /path/to/dest/image.jpg
      };


    download.image(options)
      .then(({ filename }) => {
        console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
      })
      .catch((err) => console.error(err));
})

app.listen(port, ()=>{
    console.log("Starting server")
})


