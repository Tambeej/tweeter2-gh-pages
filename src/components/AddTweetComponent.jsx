import { useState } from "react";
import { MantineProvider, Button, Textarea } from "@mantine/core";

export default function AddTweetComponenet({ onAddTweet, userName }) {
  const [newTweet, setNewTweet] = useState("");
  const [error, setError] = useState("");

  return (
    <MantineProvider>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <Textarea
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
            maxLength={200}
            placeholder="What's on youre mind?"
            autosize
            minRows={2}
            maxRows={4}
          />
          <div className="row-items">
            <span
              className={`tweet-text ${
                newTweet.length > 140 ? "over-limit" : ""
              }`}
            >
              {newTweet.length}/140
            </span>
            <Button
              variant="filled"
              onClick={() => {
                onAddTweet({
                  content: newTweet,
                  userName: userName,
                  date: new Date().toISOString(),
                });
                setNewTweet("");
              }}
              disabled={!newTweet.trim() || newTweet.length > 140}
            >
              Tweet
            </Button>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}
