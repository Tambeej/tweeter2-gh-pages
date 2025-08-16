import "./App.css";
import Home from "./components/Home.jsx";
import { useState, useEffect } from "react";
import { fetchTweets, createTweet } from "./tweetsService";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppShell,
  Group,
  Anchor,
  Container,
  MantineProvider,
} from "@mantine/core";
import ProfilePage from "./components/ProfilePage.jsx";
import Navbar from "./components/Navbar.jsx";
import { TweetsProvider } from "./context/TweetsContext.jsx";

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "Guest";
  });

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  useEffect(() => {
    const saved = localStorage.getItem("username");
    if (saved) {
      setUsername(saved);
    }
  }, []);

  useEffect(() => {
    async function loadTweets() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchTweets();
        setTweets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadTweets();
  }, []);


  useEffect(() => {
    try {
      const storedUsername = localStorage.getItem("username");
      console.log("Stored username from localStorage:", storedUsername);
      if (storedUsername) {
        console.log("Parsed username:", storedUsername);
        setUsername(storedUsername);
      } else {
        console.error("Stored username is not an array:", storedUsername);
      }
    } catch (error) {
      console.error("Error loading username from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (username.length > 0) {
      try {
        console.log("Saving username to localStorage:", username);
        localStorage.setItem("username", username);
      } catch (error) {
        console.error("Error saving username to localStorage:", error);
      }
    } else {
      console.log("Skipping save to localStorage: username is empty");
    }
  }, [username]);
  return (
    <MantineProvider>
      <Router>
        <Navbar />
        <TweetsProvider>
          <AppShell
            padding="md"
            header={
              <Group
                justify="space-between"
                align="center"
                style={{ height: "100%" }}
              >
                <Group>
                  <Anchor component={Link} to="/">
                    Home
                  </Anchor>
                  <Anchor component={Link} to="/profile">
                    Profile
                  </Anchor>
                </Group>
                <strong>{username}</strong>
              </Group>
            }
          >
            <Container>
              <Routes>
                <Route path="/" element={<Home userName={username} />} />

                <Route
                  path="/profile"
                  element={
                    <ProfilePage
                      username={username}
                      setUsername={setUsername}
                    />
                  }
                />
              </Routes>
            </Container>
          </AppShell>
        </TweetsProvider>
      </Router>
    </MantineProvider>
  );
}
