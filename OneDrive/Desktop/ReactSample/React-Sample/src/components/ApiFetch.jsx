import { useState, useEffect } from "react";

function Apifetch() {
  const [quotes, setquotes] = useState([]);

  useEffect(() => {
    const fetchquotes = async () => {
      try {
        const res = await fetch("https://dummyjson.com/quote");
        const data = await res.json();
        setquotes(data.quotes.slice(0, 10));
      } catch (e) {
        alert("error fetching quotes", e);
      }
    };
    fetchquotes();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2>Top 10 quotes List</h2>
      <ul>
        {quotes.map((quote) => (
          <li style={{ listStyle: "orded" }} key={quote.id}>
            "{quote.quote}"<strong>{quote.author}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Apifetch;
