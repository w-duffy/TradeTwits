import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { searchOptions } from "./tickers";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useSelector } from "react-redux";

import "./search.css";
function SearchBar() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const browserHistory = createBrowserHistory();
  const stockDiscussion = useSelector((state) => state.stockDiscussionReducer);

  useEffect(() => {
    setSearchTerm("");
  }, []);

  useEffect(
    async (e) => {
      if (searchTerm === "") {
        return setSearchTerm("");
      }

      const filteredResult = searchOptions.filter((word) => {
        return (
          word[0].includes(searchTerm.toUpperCase()) ||
          word[1].toUpperCase().includes(searchTerm.toUpperCase())
        );
      });

      const finalResult = filteredResult.slice(0, 5);
      setSearchResults(finalResult);
    },
    [searchTerm]
  );

  document.getElementById('search-container').addEventListener("click", function() {
    document.getElementById("form").classList.remove("active");
  });

  return (
    <div className="search_container">
      <div id="search-container" className="search__bar">
        <form action="#" class="entypo-search active">
        <input
          type="text"
          value={searchTerm}
          placeholder="Ticker or Company Name"
          onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          </form>
      </div>
      <div id="search_results">
        {searchTerm && (
          <>
            {searchResults.map((result) => (
              <>
                <div className="search-result-select">
                  {stockDiscussion && (
                    <a
                      onClick={() => {
                        setSearchTerm("");
                        browserHistory.push(`/discussion/${result[0]}`);
                      }}
                    >
                      {" "}
                      {result[0]} - {result[1]}{" "}
                    </a>
                  )}
                  {!stockDiscussion && (
                    <a
                      onClick={() => {
                        setSearchTerm("");
                        history.push(`/discussion/${result[0]}`);
                      }}
                    >
                      {" "}
                      {result[0]} - {result[1]}{" "}
                    </a>
                  )}
                </div>
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
