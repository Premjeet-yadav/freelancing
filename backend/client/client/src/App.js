// import { useState } from "react";

// function App() {
//   const [img, setImg] = useState('');
//   const [data, setData] = useState({});

  
  
//   const handleImg = async (e) => {
//     // e.preventDefault();
//      console.log(typeof(e.target.files))
//     // const file = e.target.files[0];
//     setImg(e.target.files[0]);
//     //console.log("Selected file:", file);
//     let formData = new FormData();
//     if(e.target && e.target.files){
//       console.log(img)
//       formData.append("file", img);
//       console.log('gya')
//     }
//     console.log('nhi gya ')
//     console.log(formData);
//     console.log(e.target.files[0])
//     // const reader = new FileReader();
//     // reader.onload = () => {
//     //   const fileData = reader.result;
//     //   upfun(fileData); // Call function to upload file data
//     // };
//     // reader.readAsDataURL(file);
//     try {
//       const result = await fetch(`http://localhost:8080/upload`, {
//         method: "POST",
//         body:  formData,
//       });
//       const ans = await result.json();
//       setData({ ...data, "imgurl": ans.url });
//     } catch (err) {
//       console.log(err);
//   };
// }
  
    
  
//   const upfun = async (fileData) => {
//     try {
//       const result = await fetch(`http://localhost:8080/upload`, {
//         method: "POST",
//         body: JSON.stringify({ image: fileData }), // Send file data in the request body
//         headers: {
//           'Content-Type': "application/json"
//         }
//       });
//       const ans = await result.json();
//       console.log(ans);
//       setData({ ...data, "imgurl": ans.url });
//     } catch (err) {
//       console.log(err);
//     }
//   };
  

  // const uploadImage = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await fetch(`http://localhost:8080/addDetail`, {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: {
  //         'Content-Type': "application/json"
  //       }
  //     });
  //     const ans = await result.json();
  //     console.log(ans);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleData = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };

//   return (
//     <div className="App">
//       <form onSubmit={uploadImage} encType="multipart-data">
//         <input type="file" name="imgurl" onChange={handleImg} />
//         <input type="text" onChange={handleData} name="price" placeholder="enter price" />
//         <input type="text" onChange={handleData} name="description" placeholder="enter description" />
//         <input type="text" onChange={handleData} name="name" placeholder="enter name" />
//         <input type="submit" value='submit' />
//       </form>
//       {data.imgurl && <img src={data.imgurl} alt="Uploaded" />}
//     </div>
//   );
//   }

// export default App;
import React, { useState } from 'react';

const App = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [data, setData] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    console.log('all set')
  };

  const handleUpload = async () => {
    if (!image) {
      console.log("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
   

    try {
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setImageUrl(data.url);
      setData({ ...data, "imgurl": data.url });
      console.log("Image uploaded successfully:", data.url);
      console.log(data)
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data)
  };
  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`http://localhost:8080/addDetail`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': "application/json"
        }
      });
      const ans = await result.json();
      console.log(ans);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Upload Image to Cloudinary</h2>
      <form onSubmit={uploadImage} encType="multipart-data">
         <input type="file"  onChange={handleImageChange} />
         
         <input type="text" onChange={handleData} name="price" placeholder="enter price" />
         <input type="text" onChange={handleData} name="description" placeholder="enter description" />
         <input type="text" onChange={handleData} name="name" placeholder="enter name" />
         <input type="submit" value='submit' />
       </form>
       <button onClick={handleUpload}>upload</button>
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default App;
