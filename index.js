const express = require('express')
const app = express()
const port = 3000
const sharp = require('sharp');
const download = require('image-downloader')

app.get('/api', (req, res) => {
    console.log(req.query)
    const url = req.query.url

    const options = {
        url: url,
        dest: '../../images/',               
      };


    download.image(options)
      .then(({ filename }) => {
        console.log('Saved to', filename);

        const height = parseInt(req.query.height)
        const width = parseInt(req.query.width)

        if(height || width) {
            sharp(filename)
                .resize({width: width, height: height})
                .png()
                .toFile(filename+'resized.png')
        }

        // if(height && !width){
        //     sharp(filename)
        //         .resize({height: height})
        //         .png()
        //         .toFile(filename+'resized.png')
        // }

        // if(width && !height){
        //     sharp(filename)
        //         .resize({width: width})
        //         .png()
        //         .toFile(filename+'resized.png')
        // }
        

      })
      .catch((err) => console.error(err));

    
})

app.listen(port, ()=>{
    console.log("Starting server")
})


