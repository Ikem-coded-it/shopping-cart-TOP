import { doc, setDoc, getDoc, getDocs, collection } from "firebase/firestore"; 
import { db } from "../config";
import { v4 as uuidv4 } from "uuid";

// Add a new document in collection "cities"
const uploadToSpalding = async(ball) => {
  try {
     await setDoc(doc(db, "products/balls/spalding", uuidv4()), {
      title: ball.title,
      description: ball.description,
      price: ball.price,
      src: ball.src
    });
  } catch (error) {
    alert(error.message)
  }
}

const fetchAllSpaldingBalls = async() => {
  try {
    const fetchedSpaldingBalls = []
    const querySnapshot = await getDocs(collection(db, "products/balls/spalding"));
    querySnapshot.forEach((doc) => {
      const id = doc.id
      const data = doc.data()
      fetchedSpaldingBalls.push({id, data})
    });
    return fetchedSpaldingBalls;
  } catch (error) {
    alert(error.message)
  }
}

const uploadToWilson = async(ball) => {
  try {
    setDoc(doc(db, "products/balls/wilson", uuidv4()), {
      title: ball.title,
      description: ball.description,
      price: ball.price,
      src: ball.src
    });
  } catch (error) {
    alert(error.message)
  }
}

  
const fetchAllWilsonBalls = async() => {
  try {
    const fetchedWilsonBalls = []
    const querySnapshot = await getDocs(collection(db, "products/balls/wilson"));
    querySnapshot.forEach((doc) => {
      const id = doc.id
      const data = doc.data()
      fetchedWilsonBalls.push({id, data})
    });
    return fetchedWilsonBalls;
  } catch (error) {
    alert(error.message)
  }
}

const uploadToMolten = async(ball) => {
  try {
    await setDoc(doc(db, "products/balls/molten", uuidv4()), {
      title: ball.title,
      description: ball.description,
      price: ball.price,
      src: ball.src
    });
  } catch (error) {
    alert(error.message)
  }
}


const fetchAllMoltenBalls = async() => {
  try {
    const fetchedMoltenBalls = []
    const querySnapshot = await getDocs(collection(db, "products/balls/molten"));
    querySnapshot.forEach((doc) => {
      const id = doc.id
      const data = doc.data()
      fetchedMoltenBalls.push({id, data})
    });
    return fetchedMoltenBalls;
  } catch (error) {
    alert(error.message)
  }
}

const fetchSingleBall = async (collection, ballId) => {
  try {
    const docRef = doc(db, `products/balls/${collection}`, ballId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(data)
      return data
    } else {
      alert("Ball does not exist");
    }
  } catch (error) {
    alert(error.message)
  }
}

export { 
  uploadToSpalding,
  uploadToWilson,
  uploadToMolten,
  fetchAllSpaldingBalls,
  fetchAllWilsonBalls,
  fetchAllMoltenBalls,
  fetchSingleBall,
}