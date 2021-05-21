import React from "react";
import "./searchbox.styles.css";

export const SearchBox = ({ placeholder, handleChange }) => (
  <input
    className="searchbox"
    type="text"
    placeholder={placeholder}
    onChange={handleChange}
  />
);
