import React from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";

const SearchBar = props => {
  return (
    <div class="searchbar-container">
      <form>
        <div className="input-group">
          <input className="job-input" placeholder="Search Jobs" />
          <input class="city-input" placeholder="Where?" />
          <button class="button">Search</button>
        </div>
      </form>
    </div>
  );
};

SearchBar.propTypes = {};

export default SearchBar;
