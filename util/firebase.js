import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDk7by9qZL8aM7yrX7m066wQuj3I8dcC5M",
    authDomain: "ecom-app-44d38.firebaseapp.com",
    projectId: "ecom-app-44d38",
    storageBucket: "ecom-app-44d38.appspot.com",
    messagingSenderId: "812768989841",
    appId: "1:812768989841:web:494c7c586665c183a56530"
}

if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)
else firebase.app()

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()


