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

  if (!firstName || firstName === '')
    return new Error("First name is required")

  if (!lastName || lastName === '')
    return new Error("Last name is required")

  if (!email || email === '')
    return new Error("Email is required")

  if (!password || password === '')
    return new Error("Password is required")

  if (!confirmPassword || confirmPassword === '')
    return new Error("Password confirmation is required")

   if (password !== confirmPassword) {
    return new Error("Password confirmation must match password")
   }   
}

const validateSignInForm = (form) => {
  const email = form.email.value;
  const password = form.password.value;

  if (!email || email === '')
    return new Error("Please provide an email address")
    
  if (!password || password === '') 
    return new Error("Please provide a password")
}

const firebaseSignUp = async (form) => {
  try {
    const validationResult = validateSignUpForm(form)
    if (validationResult instanceof Error) return validationResult;

    const email = form.email.value;
    const password = form.password.value;

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;

     // create empty cart for user
    await setDoc(doc(db, "carts", user.uid), {cart: []});

    return user;
  } catch (error) {
    if (error.code === "auth/email-already-in-use") 
      return new Error("Email already in use")
  }
}

const firebaseSignIn = async(form) => {
  try {
    const validationResult = validateSignInForm(form)
    if (validationResult instanceof Error) return validationResult;

    const email = form.email.value
    const password = form.password.value

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user;
  } catch (error) {
    if (error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" )
      return new Error('Invalid Credentials')
  }
}

const firebaseSignOut = async() => {
  await auth.signOut()
}

const googleSignin = async() => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user;

    // check if cart and create cart
    await getCart(user.uid)

    return user 
  } catch (error) {
    return new Error(error.message)
  }
}

export {
  firebaseSignUp,
  firebaseSignIn,
  firebaseSignOut,
  googleSignin,
}