import { useState } from "react";
const MainBanner = ({
  search,
  setSearch,
  setOrdering,
  count,
  page,
  setPage,
  lastPage,
  isLoading,
}) => {
  console.log("last page : ", lastPage);
  console.log("search, ", search);
  const [pageError, setPageError] = useState(false);

  {
    /* ------------------ code pour le timeout  ------------------ */
  }
  let timeout;
  const setDelaySearch = (value, delay) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      setPage(1);
      setSearch(value);
    }, delay);
  };

  let timeoutPage;
  const setDelaySearchPage = (value, delay) => {
    if (timeoutPage) {
      clearTimeout(timeoutPage);
    }
    timeoutPage = setTimeout(() => {
      setPageError(false);
      if (value > 0 && value <= lastPage) {
        setPage(value);
      } else {
        setPageError(true);
      }
    }, delay);
  };
  {
    /* ---------------------------------------------------------- */
  }

  if (!isLoading) {
    return (
      <>
        <section className="sticky-header">
          <input
            type="text"
            id="search-game"
            name="search-game"
            placeholder={`${search}?  search ${count} games`}
            onChange={(event) => {
              event.preventDefault();
              setDelaySearch(event.target.value, 2000);
            }}
          />
        </section>
        <section className="sort-page">
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
              type="text"
              id="page-number"
              placeholder={page}
              onChange={(event) => {
                event.preventDefault();
                if (
                  Number(event.target.value) <= lastPage &&
                  Number(event.target.value > 0)
                )
                  setPage(Number(event.target.value));
                setDelaySearchPage(event.target.value, 1500);
              }}
            />
            {pageError && <p>Please enter a valid page (max : {lastPage})</p>}
          </div>
        </section>
      </>
    );
  } else if (isLoading) {
    return (
      <section className="sticky-header">
        <h1>Find your favorite games</h1>
      </section>
    );
  } else {
    return (
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
    );
  }
};

export default MainBanner;
