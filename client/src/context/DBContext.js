import React, { useContext, useState } from "react";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import app from "../firebase";
import { v4 as uuidv4 } from 'uuid';
const DatabaseContext = React.createContext();

export function useDB() {
  return useContext(DatabaseContext);
}

const db = app.firestore();

export function DataBaseProvider({ children }) {
  const usersRef = db.collection("users");
  const [basket, setBasket] = useState([]) 

  const getUserFromStore = async (userEmail) => {
    const res = await usersRef.where("email_adress", "==", userEmail).get();
    return res;
  };

  const signupUserOnStore = async (user) => {
    const res = await usersRef.add(user);
    console.log(res);
  };


  const value = {
    signupUserOnStore,
    getUserFromStore,
    setBasket,
    basket
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}