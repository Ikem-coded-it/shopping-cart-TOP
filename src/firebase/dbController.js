import { doc, setDoc, collection, getDocs } from "firebase/firestore"; 
import { db } from "./config";

// Add a new document in collection "cities"
const uploadToSpalding = async(ball) => {
  try {
     await setDoc(doc(db, "products/balls/spalding", ball.title), {
      title: ball.title,
      description: ball.description,
      price: ball.price,
      src: ball.src
    });
  } catch (error) {
    alert(error.message)
  }
}

const getSpaldingBalls = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products/balls/spalding"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    alert(error.message)
  }
}

const uploadToWilson = async(ball) => {
  try {
    setDoc(doc(db, "products/balls/wilson", ball.title), {
      title: ball.title,
      description: ball.description,
      price: ball.price,
      src: ball.src
    });
  } catch (error) {
    alert(error.message)
  }
}

const uploadToMolten = async(ball) => {
  try {
    await setDoc(doc(db, "products/balls/molten", ball.title), {
      title: ball.title,
      description: ball.description,
      price: ball.price,
      src: ball.src
    });
  } catch (error) {
    alert(error.message)
  }
}

export { 
  uploadToSpalding,
  uploadToWilson,
  uploadToMolten,
  getSpaldingBalls,
}