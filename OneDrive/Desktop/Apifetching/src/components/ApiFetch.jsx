import { useState, useEffect } from "react";
import "./Apifetch.css";

function Apifetch() {
  const [quotes, setquotes] = useState([]);

  useEffect(() => {
    async function FetchQuotes() {
      try {
        const response = await fetch("https://dummyjson.com/quote");
        const data = await response.json();
        setquotes(data.quotes.slice(0, 10));
      } catch (e) {
        alert("Error Fetching Quotes");
      }
    }
    FetchQuotes();
  }, []);

  return (
    <div className="fetch">
      <h2 className="head">Top 10 Quote Lists</h2>
      <ul className="ul-1">
        {quotes.map((quote) => {
          return <li key={quote.id}>"{quote.quote}"</li>;
        })}
      </ul>
    </div>
  );
}

export default Apifetch;
