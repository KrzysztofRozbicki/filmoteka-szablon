//Wstępny szablon funkcji Firebase:
//DO ZMIANY:
// ZAMIANA NA ASYNC AWAIT
// DODANIE METOD ODCZYTYWANIA I ZAPISYWANIA / AKTUALIZACJI BAZY DANYCH
// POWIĄZANIE Z BUTTONAMI DO DODAWANIA I ODCZYTYWANIA

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB0FxWwjInqh4F0be_50HwVzJ0iqkETgXY',
  authDomain: 'filmoteka-f3080.firebaseapp.com',
  projectId: 'filmoteka-f3080',
  storageBucket: 'filmoteka-f3080.appspot.com',
  messagingSenderId: '339706643558',
  appId: '1:339706643558:web:94b37fe16030e950b259a7',
  measurementId: 'G-81MRNCTEB6',
  databaseURL: 'https://filmoteka-f3080-default-rtdb.europe-west1.firebasedatabase.app',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(firebaseApp);

//Tutaj pobieram buttony i inputy do danych.
const userEmailEl = document.getElementById('user-email');
const userPasswordEl = document.getElementById('user-password');
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const resetBtn = document.getElementById('reset-btn');
const googleBtn = document.getElementById('google-btn');

//Funkcja zeruje wartości email i password
const resetFields = () => {
  userEmailEl.value = '';
  userPasswordEl.value = '';
};

//Funkcja sprawdza czy użytkownik jest zalogowany czy nie
const checkUserState = () => {
  const user = auth.currentUser;
  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log('USER LOGGED');
      console.log(user);
      // ...
    } else {
      console.log('USER NOT LOGGED');
      // User is signed out
      // ...
    }
  });
};

//Funkcja zapisuje użytkownika do bazy danych
const saveUserToDatabase = (user, email) => {
  const userRef = ref(database, 'users/' + user.uid);
  const user_data = {
    id: user.uid,
    email: email,
  };
  set(userRef, user_data)
    .then(() => {
      console.log('Saved user to database');
    })
    .catch(error => {
      console.error('Error saving user to database:', error);
    });
};

//Jedyna funkcja eksportowa - ustala addEventListenery oraz co mają robić i jak reagowaćz Firbease
export const setRegisterAndSinUp = () => {
  //od razu po załadowaniu strony  sprawdza czy użytkownik jest zalogowany czy nie
  checkUserState();

  //funkcja rejestracji, rejestruje użytkownika, dodaje go do bazy danych
  registerBtn.addEventListener('click', event => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, userEmailEl.value, userPasswordEl.value).then(
      userCredential => {
        const user = userCredential.user;
        saveUserToDatabase(user, userEmailEl.value);
        resetFields();
        checkUserState();
      }
    );
  });

  //funkcja logowania użytkownika poprzez email i hasło
  loginBtn.addEventListener('click', event => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, userEmailEl.value, userPasswordEl.value)
      .then(userCredential => {
        const user = userCredential.user;
        alert(user.email + ' login successfuly!');
        resetFields();
        checkUserState();
      })
      .catch(error => {
        alert(error.message);
      });
  });

  //funkcja wylogowywania użytkownika
  logoutBtn.addEventListener('click', event => {
    event.preventDefault();
    signOut(auth).then(() => alert('log out successful!'));
    checkUserState();
  });

  //Funkcja resetowania hasła

  resetBtn.addEventListener('click', event => {
    event.preventDefault();
    sendPasswordResetEmail(auth, userEmailEl.value).then(() => alert('password reset email sent'));
    checkUserState();
  });

  //Funkcja logowania przez Google
  googleBtn.addEventListener('click', event => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        alert('login successfuly!');
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        saveUserToDatabase(user, user.email);
        checkUserState();
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(errorMessage, errorCode);
      });
  });
};
