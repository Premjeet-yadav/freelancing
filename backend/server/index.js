const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const ProductModel = require('./Model/Product.model');
const { mainModule } = require('./Model/Product.model');
const { connection } = require('./config/db');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); 
  
const PORT = process.env.PORT;

 
cloudinary.config({  
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
}) 

  
app.get('/', (req, res) => {
    res.send('base url of multer and cloudinary...')
})
 

// const storage = multer.memoryStorage();
// const upload = multer({ storage })
const storage = multer.diskStorage({
    filename: function (req,file,cb) {
      cb(null, file.originalname)
    }
  });
  
  const upload = multer({storage: storage});
  


app.post('/addDetail', async (req, res) => {
    const { price, name, description, imgurl } = req.body;
    const newItem = new ProductModel({ price, name, description, imgurl })
    try {
        await newItem.save();
        res.send({ msg: 'added successfully....' })
    } catch (err) { 
        console.log(err)
        res.send('Error unable to upload product')
    } 
})   

app.post('/upload', upload.single('file'), async (req, res) => {
    // try {
    //     console.log(req.file)
    //     const fileBuffer = req.file.buffer;
    //     console.log(fileBuffer);
    //     // Cloudinary upload process
    //     const timestamp = new Date().getTime();
    //     const uniqueId = Math.floor(Math.random() * 100000);
    //     const publicId = `image_${timestamp}_${uniqueId}`;

    //     // Create a readable stream from the file buffer
    //     // const result = await cloudinary.uploader.upload(req.file.buffer, {
    //     //     folder: 'uploads' // Optional folder in Cloudinary
    //     //   });
      
    //     //   // Respond with the URL of the uploaded file 
    //     //   res.status(200).json({ url: result.secure_url });
    //      cloudinary.uploader.upload(req.file.path, function (err, result){
    //         if(err) {
    //           console.log(err);
    //           return res.status(500).json({
    //             success: false,
    //             message: "Error"
    //           })
    //         } 
        
    //         res.status(200).json({
    //           success: true,
    //           message:"Uploaded!",
    //           data: result
    //         })
    //       })

    // } catch (error) {
    //     console.error(error); 
    //     res.status(500).json({ message: "Error: " + error.message });
    // }
    cloudinary.uploader.upload(req.file.path, function (err, result){
        if(err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error"
          })
        }
    
        res.status(200).json({
          url : result.url
        })
      })
});



app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`listening on port ${PORT}`)
    }
    catch (err) {
        console.log('unable to connect to db')
    }
}) 
 