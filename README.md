<h1 align="center">
<img width="250px" src="Assets/LOGO.png" alt="OnlyFoods logo">
</h1>
<p align="center" style="font-style:italic">
Social media application that strives to connect people, one recipe at a time.
</p>

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Next Steps](#next-steps)
- [Developers](#developers)

## Introduction

Don’t know what to eat? Get inspired! OnlyFoods is a social media app that has recipes from people all around the world. Bookmark what looks best to you and make it your own. Share your favorite recipes with friends near and far.

Watch our demo video [here](https://www.youtube.com/watch?v=VGSq_mDjHcE&list=PLx0iOsdUOUmnZ41wPTSftv8Mpk-PiZqaR&index=15)!

## Getting Started

Fork and clone this repo. Then, `npm install`.

Create a Firebase config file:

`touch firebase_config.js`

Add your Firebase configuration into `firebase_config.js`:

```
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore"

const firebaseConfig = {
  apiKey: 'YOUR_KEY_HERE_AIzaSyAOWH',
  authDomain: 'your-auth-domain-b1234.firebaseapp.com',
  databaseURL: 'https://your-database-name.firebaseio.com',
  projectId: 'your-project-id-1234',
  storageBucket: 'your-project-id-1234.appspot.com',
  messagingSenderId: '12345-insert-yourse',
  appId: 'insert yours: 1:1234:web:ee873bd1234c0deb7eba61ce',
};

// Initialize Firebase
let firebase

getApps().length === 0 ? firebase = initializeApp(firebaseConfig) : firebase = getApp();

//get auth
const auth = getAuth(firebase)

//init firestore services
const db = getFirestore()

export { firebase, auth, db }
```

Run `expo start`.

## Tech Stack

- React Native
- Firebase (Cloud Firestore & Authentication)
- Expo

## Features

### App Features

- Persistent Login: Through Firebase Authentication
- Home page: Browse all recipes listed as public from other OnlyFoods users
- Bookmarks: Save recipes to return to later
- User page: Keep track of all logged in user's recipes, public and private
- Upload Recipes: Add photos, ingredients, instructions for recipes, with the option to have the recipe public (shared) or private (only viewable by recipe creator)
- Edit Recipe: Recipe creators have the option to update any aspect of their posted recipes

### Technical Features

- Registration with E-mail & Password
- Writing to & reading from Firestore Database
- React Navigation with nested stack & bottom tab navigators

## Next Steps

The next steps for OnlyFoods include adding the ability to view other users' recipes page, follow specific users and their recipe posts, and a search feature to browse for specific types of recipes.

## Developers

Meet the team behind OnlyFoods!

- Tenzin Choetsu - [Github](https://github.com/10zchoe) | [LinkedIn](https://www.linkedin.com/in/10zinchoetso/)
- Rachel Kim - [Github](https://github.com/rmk0305) | [LinkedIn](https://www.linkedin.com/in/rachel-minjae-kim/)
- Melissa Moy - [Github](https://github.com/melissaemoy) | [LinkedIn](https://www.linkedin.com/in/melissamoy8/)
- Seldon Tselung - [Github](https://github.com/SeldonTselung) | [LinkedIn](https://www.linkedin.com/in/seldontselung/)
