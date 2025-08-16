const API_URL = "https://uckmgdznnsnusvmyfvsb.supabase.co/rest/v1/Tweets";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo";

export async function fetchTweets() {
  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`Error fetching tweets: ${res.statusText}`);
  return res.json();
}

export async function createTweet(tweet) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(tweet),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error creating tweet: ${errorText}`);
  }
  return res.json();
}
