export default function TweetsComponent({ tweets, loading, error }) {
  return (
    <div>
      <h2>Tweets</h2>
      {loading && <p>Loading tweets...</p>}
      {tweets.length === 0 && <p>No tweets yet.</p>}
      {tweets
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((tweet) => (
          <div className="tweet-card" key={tweet.id}>
            <div className="row-items grey">
              <small>{tweet.userName}</small>
              <small>{new Date(tweet.date).toLocaleString()}</small>
            </div>
            <p>{tweet.content}</p>
          </div>
        ))}
    </div>
  );
}
