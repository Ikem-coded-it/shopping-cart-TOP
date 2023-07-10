import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { getCart } from "./dbController";
import { db } from "../config";

import { auth } from "../config";
const provider = new GoogleAuthProvider();

const validateSignUpForm = (form) => {
  const firstName = form.firstname.value;
  const lastName = form.lastname.value;
  const email = form.email.value;
  const password = form.password.value;
  const confirmPassword = form.confirmpassword.value;

  if (!firstName || firstName === '' ||
      !lastName || lastName === '' ||
      !email || email === '' ||
      !password || password === '' ||
      !confirmPassword || confirmPassword === '') {
        throw new Error("Please provide complete information")
      }

   if (password !== confirmPassword) {
    throw new Error("Password confirmation must match password")
   }   
}

const validateSignInForm = (form) => {
  const email = form.email.value;
  const password = form.password.value;

  if (!email || email === '' ||
      !password || password === '') 
    console.log(new Error("Please provide an email and password"))
}

const firebaseSignUp = (form) => {
  validateSignUpForm(form)
  const email = form.email.value;
  const password = form.password.value;
 
  createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;

    // create empty cart for user
    await setDoc(doc(db, "carts", user.uid), {cart: []});
    console.log("User created: ", user)
  })
  .catch((error) => {
    if (error.code === "auth/email-already-in-use") 
      alert("Email already in use")
    console.log(error.code)
    console.log(new Error(error.message))
  });
}

const firebaseSignIn = (form) => {
  validateSignInForm(form)
  const email = form.email.value
  const password = form.password.value

   signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    return user;
  })
  .catch((error) => {
    if (error.code === "auth/wrong-password")
      alert('Wrong email or password')
      console.log(error.message)
  });
}

const firebaseSignOut = () => {
  auth.signOut().then(() => {
    return
  })
}

const googleSignin = async() => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user;

    // check if cart and create cart
    await getCart(user.uid)

    return user 
  } catch (error) {
    alert(error.message)
  }
}

export {
  firebaseSignUp,
  firebaseSignIn,
  firebaseSignOut,
  googleSignin,
}