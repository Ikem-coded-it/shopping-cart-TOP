import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../config";

const validateSignUpForm = (form) => {
  const firstName = form.firtname.value;
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
  .then((userCredential) => {
    const user = userCredential.user;
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
    console.log("User signed in: ", user)
  })
  .catch((error) => {
    if (error.code === "auth/wrong-password")
      alert('Wrong email or password')
    console.log(error.message)
  });
}

const observeAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log(user.uid);
      // ...
    } else {
      // User is signed out
      // ...
      console.log("here");
    }
  });
}

export {
  firebaseSignUp,
  firebaseSignIn,
  observeAuth,
}