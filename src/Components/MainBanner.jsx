const MainBanner = ({
  setSearch,
  setOrdering,
  count,
  page,
  setPage,
  lastPage,
  isLoading,
}) => {
  console.log("last page : ", lastPage);

  {
    /* ------------------ code pour le timeout  ------------------ */
  }
  let timeout;
  const setDelaySearch = (value, delay) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      setSearch(value);
    }, delay);
  };
  {
    /* ---------------------------------------------------------- */
  }

  return (
    <header>
      <section className="title-sec">
        <h1>Find and rate your favorite games</h1>
        {count ? (
          <div className="search-order">
            <input
              type="text"
              id="search-game"
              name="search-game"
              placeholder={`search ${count} games`}
              onChange={(event) => {
                event.preventDefault();
                setDelaySearch(event.target.value, 1000);
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
            <div className="search-page">
              <label>Page</label>
              <input
                type="number"
                id="page-number"
                placeholder={page}
                min="1"
                max={lastPage}
                onChange={(event) => {
                  event.preventDefault();
                  setPage(event.target.value);
                }}
              />
            </div>
          </div>
        ) : isLoading ? (
          <p>Loading, please wait...</p>
        ) : (
          <div className="search-order">
            <input
              type="text"
              id="search-game"
              name="search-game"
              placeholder={`no game found, try another research!`}
              onChange={(event) => {
                event.preventDefault();
                setSearch(event.target.value);
              }}
            />
          </div>
        )}
      </section>
    </header>
  );
};

export default MainBanner;
