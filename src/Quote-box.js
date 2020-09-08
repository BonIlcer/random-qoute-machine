import React from "react";
import { useState, useEffect } from "react";
import twitterLogo from "./twitter-brands.svg";

function openURL(url) {
  window.open(url);
}

function inFrame() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function QuoteBox() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [curQuote, setQuote] = useState(0);

  function randomQuote() {
    const index = Math.floor(items.length * Math.random());
    console.log("Current quote index: ", index);
    return index;
  }

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.quotes);
          setItems(result.quotes);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div id="quote-box">
        <div id="text">{items[curQuote].quote}</div>
        <div id="author">{items[curQuote].author}</div>
        <div className="buttons">
          <a
            onClick={() => {
              openURL(
                "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                  encodeURIComponent(
                    '"' + items[curQuote].quote + '" ' + items[curQuote].author
                  )
              );
            }}
          >
            <img className="logo" src="" alt="twitter logo" />
          </a>
          <button
            id="new-quote"
            onClick={() => {
              setQuote(randomQuote());
            }}
          >
            New quote
          </button>
        </div>
      </div>
    );
  }
}

export default QuoteBox;
