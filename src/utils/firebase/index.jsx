import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCR5BpDafpwNZm1L8nHlccbM6_RYwb0vtk",
    authDomain: "rocket-1d23d.firebaseapp.com",
    projectId: "rocket-1d23d",
    storageBucket: "rocket-1d23d.appspot.com",
    messagingSenderId: "382318699090",
    appId: "1:382318699090:web:ac0961254fee3d04f1358b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
