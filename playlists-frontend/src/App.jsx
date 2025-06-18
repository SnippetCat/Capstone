import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import "./App.css";

import Notification from "./components/Notification";
import Header from "./components/Header";
import Home from "./views/Home"
import About from "./views/About";
import PlaylistDisplay from "./views/PlaylistDisplay";
import LoginForm from "./views/LoginForm";
import PlaylistForm from "./views/PlaylistForm";
import Users from "./views/Users";
import User from "./components/User";
import Footer from "./components/Footer";

import PlaylistService from "./services/playlistService";
import LoginService from "./services/loginService";
import { fetchPlaylistsDBStore, setInitialPlaylists } from "./reducers/playlistsReducer";
import { setLoggedUser, setUserStore } from "./reducers/loggedUserReducer";
import { fetchUsersDBStore } from "./reducers/usersReducer";



const App = () => {
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => {
    return state.loggedUser
  });

  const users = useSelector((state) => state.users)

  useEffect(() => {
    console.log("Hello")
    dispatch(fetchPlaylistsDBStore());
    dispatch(fetchUsersDBStore());

    console.log(users)

    const savedUser = JSON.parse(localStorage.getItem("userCredentials"))
    dispatch(setUserStore(savedUser));
  }, [])

  return (
    <div>
      <Notification />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {loggedUser
            ? (
              <>
                <Route path="/playlists" element={<PlaylistDisplay />} />
                <Route path="/users" element={<Users />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/addPlaylists" element={<PlaylistForm />} />
              </>
            )
            : <Route path="/login" element={<LoginForm />} />}
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App;