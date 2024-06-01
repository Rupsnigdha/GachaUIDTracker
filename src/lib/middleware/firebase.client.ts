import { initializeApp, getApps, getApp, deleteApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import {
	PUBLIC_APIKEY,
	PUBLIC_AUTHDOMAIN,
	PUBLIC_PROJECTID,
	PUBLIC_STORAGEBUCKET,
	PUBLIC_MESSAGINGSENDERID,
	PUBLIC_APPID,
	PUBLIC_MEASUREMENTID,
    PUBLIC_DATABASEURL
} from '$env/static/public'

const firebaseConfig = {
	apiKey: PUBLIC_APIKEY,
	authDomain: PUBLIC_AUTHDOMAIN,
	projectId: PUBLIC_PROJECTID,
	storageBucket: PUBLIC_STORAGEBUCKET,
	messagingSenderId: PUBLIC_MESSAGINGSENDERID,
	appId: PUBLIC_APPID,
	measurementId: PUBLIC_MEASUREMENTID,
}

let firebaseApp

if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig)
} else {
	firebaseApp = getApp()
	deleteApp(firebaseApp)
	firebaseApp = initializeApp(firebaseConfig)
}
export const db = getFirestore(firebaseApp)