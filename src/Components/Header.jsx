const Header = ({ setSearch, setOrdering, count }) => {
  return (
    <header>
      <section className="title-sec">
        <h1>Find and rate your favorite games</h1>
        <div className="search-order">
          <input
            type="text"
            id="search-game"
            name="search-game"
            placeholder={`search ${count} games`}
            onChange={(event) => {
              event.preventDefault();
              setSearch(event.target.value);
            }}
          />
          <div className="sort">
            <label htmlFor="choices">Sort by...</label>
            <select
              name="choices"
              id="choices"
              onChange={(event) => {
                setOrdering(event.target.value);
              }}
            >
              <option value="added">date added </option>
              <option value="name">name</option>
              <option value="rating">best rated</option>
              <option value="released">last released</option>
            </select>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
