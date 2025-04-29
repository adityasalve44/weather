// src/components/SearchPage.js
import { useState } from "react";

const SearchPage = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSearch(query);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container search-page">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError(null);
          }}
          placeholder="Enter city name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

        {error && (
          <div className="error-message">
            {error && <p className="error">{error}</p>}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchPage;
