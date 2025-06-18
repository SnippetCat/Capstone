import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import PlaylistDisplay from "./components/PlaylistDisplay";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Header from "./components/Header";

import PlaylistService from "./services/playlistService";
import LoginService from "./services/loginService";
import { fetchPlaylistsDBStore, setInitialPlaylists } from "./reducers/playlistsReducer";
import { setLoggedUser, setUserStore } from "./reducers/loggedUserReducer";



const App = () => {
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => {
    return state.loggedUser
  });

  useEffect(() => {
    dispatch(fetchPlaylistsDBStore());
    console.log("here!")

    const savedUser = JSON.parse(localStorage.getItem("userCredentials"))
    dispatch(setUserStore(savedUser));
  }, [])

  return (
    <div>
      <Notification />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={
            loggedUser ? <PlaylistDisplay /> : <LoginForm />
          }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App;