import arrowLeft from "../pictures/arrow-game-left.png";
import arrowRight from "../pictures/arrow-game-right.png";
const PageNav = ({ page, setPage, lastPage }) => {
  return (
    <>
      {page === 1 ? (
        <section className="nav-pages">
          <section className="left-button-class"></section>
          <section className="right-button-class">
            <button
              className="right-but"
              onClick={() => setPage(Number(page) + 1)}
            >
              <p> Next page </p>
              <img src={arrowRight} />
            </button>
            <button
              className="last-page-but"
              onClick={() => setPage(Number(lastPage))}
            >
              Go to last page
            </button>
          </section>
        </section>
      ) : page > 1 && page < lastPage ? (
        <section className="nav-pages">
          <section className="left-button-class">
            <button
              className="left-but"
              onClick={() => setPage(Number(page) - 1)}
            >
              <p>Previous page</p>
              <img src={arrowLeft} />
            </button>
            <button className="first-page-but" onClick={() => setPage(1)}>
              Go to first page
            </button>
          </section>
          <section className="left-button-class">
            <button
              className="right-but"
              onClick={() => setPage(Number(page) + 1)}
            >
              <p> Next page </p>
              <img src={arrowRight} />
            </button>
            <button className="last-page-but" onClick={() => setPage(lastPage)}>
              Go to last page
            </button>
          </section>
        </section>
      ) : (
        <section className="nav-pages">
          <section className="left-button-class">
            <button className="left-but">
              <img src={arrowLeft} onClick={() => setPage(Number(page) - 1)} />
              Go to first page
            </button>
            <button className="first-page-but" onClick={() => setPage(1)}>
              <p>Previous page</p>
            </button>
          </section>
          <section className="left-button-class"></section>
        </section>
      )}
    </>
  );
};

export default PageNav;
