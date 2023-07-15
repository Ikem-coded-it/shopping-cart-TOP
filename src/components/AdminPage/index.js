import { useState, useRef } from "react";
import { storage } from "../../firebase/config";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL  
} from "firebase/storage";

import {
  uploadToSpalding,
  uploadToWilson,
  uploadToMolten,
} from "../../firebase/controllers/dbController";

import "./styles.css"

export default function Admin () {
  const [imageUpload, setImageUpload] = useState(null);
  const result = useRef()
 
   const handleUpload = async (e) => {
    e.preventDefault()
    if (imageUpload == null) return;

    let imageRef;

    if (imageUpload.name.startsWith("spa")) {
      imageRef = ref(storage, `balls/spalding/${imageUpload.name}`);
    } else if (imageUpload.name.startsWith("wil")) {
      imageRef = ref(storage, `balls/wilson/${imageUpload.name}`);
    } else {
      imageRef = ref(storage, `balls/molten/${imageUpload.name}`);
    }

    const snapshot = await uploadBytes(imageRef, imageUpload)
    const url = await getDownloadURL(snapshot.ref)
     
    const ball = {
      title: e.target.title.value,
      description: e.target.description.value,
      price: e.target.price.value,
      src: url,
    }

    const ballName = ball.title.split(" ")[0]
    switch(ballName) {
      case "Spalding":
        await uploadToSpalding(ball)
        break;
      case "Wilson":
        await uploadToWilson(ball)
        break;
      default:
        await uploadToMolten(ball)
    }
    result.current.innerText = "Uploaded successfully"
  };

  return (
    <div
      className="admin-upload">
      <form 
        onSubmit={(e) => handleUpload(e)}
        className="ball-upload-form">
        <div 
          className="title-container">
            <input 
              name="title"
              className="upload-ball-title-input" 
              placeholder="title" />
        </div>
        <div 
          className="description-container">
            <textarea 
              className="upload-ball-description-input"
              name="description"
              placeholder="description">
            </textarea>
        </div>
        <div 
          className="price-container">
            <input 
              name="price"
              className="upload-ball-price-input" 
              type="number" 
              placeholder="0" 
            />
        </div>
        <div 
          className="image-container">
            <input
              className="upload-ball-image-input" 
              type="file" 
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }} />
        </div>
        <div
          className="upload-btn-container">
          <button className="upload-btn">Upload</button>
        </div>
      </form>
      <div 
        className="result-display"
        ref={result}>
        </div>
    </div>
  )
}