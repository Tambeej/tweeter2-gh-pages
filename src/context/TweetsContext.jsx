import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { fetchTweets, createTweet } from "../tweetsService";

const TweetsContext = createContext();

export function TweetsProvider({ children }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTweets();
  }, []);

  const loadTweets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTweets();
      setTweets(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(loadTweets, 10000);
    return () => clearInterval(interval);
  }, [loadTweets]);

  const addTweet = async (tweetObj) => {
    try {
      const created = await createTweet(tweetObj);
      setTweets((prev) => [created[0], ...prev]);
    } catch (err) {
      setError(`Error creating tweet: ${err.message}`);
    }
  };

  return (
    <TweetsContext.Provider
      value={{
        tweets,
        loading,
        error,
        addTweet,
        setLoading,
        setError,
        setTweets,
      }}
    >
      {children}
    </TweetsContext.Provider>
  );
}

export function useTweets() {
  return useContext(TweetsContext);
}
