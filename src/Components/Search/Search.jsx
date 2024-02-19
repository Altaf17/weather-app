const Search = ({ search, setSearch, handleSearch }) => {
  return (
    <div className="search-engine">
      <input
        type="text"
        name="search"
        placeholder="Enter City Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search Weather</button>
    </div>
  );
};

export default Search;
