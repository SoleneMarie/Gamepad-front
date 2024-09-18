import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import { FaPlus } from "react-icons/fa";
import placeHolder from "../pictures/placeholder.png";
import arrowLeft from "../pictures/arrow-game-left.png";
import arrowRight from "../pictures/arrow-game-right.png";
import Header from "../Components/Header";
import MainBanner from "../Components/MainBanner";

const Home = () => {
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);

  useEffect(() => {
    setIsLoading(true);
    const dataGamesFunc = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000?search=${search}&ordering=${ordering}&page=${page}&pagesize=${pageSize}`
        );
        setData(response.data.results);
        setCount(response.data.count);
        if (count % pageSize === 0) {
          setLastPage(count / pageSize);
        } else {
          setLastPage(Math.trunc(count / pageSize + 1));
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    dataGamesFunc();
  }, [ordering, search, page]);
  console.log(data);
  if (isLoading) {
    return (
      <>
        <Header />
        <main>
          <LeftMenu />
          <section className="content">
            <MainBanner
              setSearch={setSearch}
              setOrdering={setOrdering}
              count={count}
              page={page}
              setPage={setPage}
              lastPage={lastPage}
              isLoading={isLoading}
            />

            <p>Loading content</p>
            <Footer />
          </section>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <main>
          <LeftMenu />
          {/* -----------------------------------------------------------------------------------------------
          -------------------------------------------CONTENU PRINCIPAL --------------------------------------
          ------------------------------------------------------------------------------------------------- */}
          <section className="content">
            <MainBanner
              setSearch={setSearch}
              setOrdering={setOrdering}
              count={count}
              page={page}
              setPage={setPage}
              lastPage={lastPage}
            />
            {/* -------------------------------- RECUPERATION DU CONTENU -------------------------------- */}
            <section className="all-games">
              {data.length > 0 &&
                data.map((item) => {
                  if (
                    !item.name.includes("sex") &&
                    !item.name.includes("hentai") &&
                    !item.name.includes("Sex") &&
                    !item.name.includes("Hentai") &&
                    !item.name.includes("SEX") &&
                    !item.name.includes("HENTAI")
                  ) {
                    return (
                      <section className="one-game" key={item.id}>
                        {item.background_image ? (
                          <div className="one-game-pic">
                            <Link to={`/game/${item.id}`}>
                              <img src={item.background_image} />
                            </Link>
                          </div>
                        ) : (
                          <div className="one-game-pic">
                            <Link to={`/game/${item.id}`}>
                              <img src={placeHolder} />
                            </Link>
                          </div>
                        )}
                        <section className="one-game-infos">
                          <div className="all-platforms">
                            {item.platforms &&
                              item.platforms.map((itembis) => {
                                return (
                                  <div
                                    className="one-platform"
                                    key={itembis.platform.id}
                                  >
                                    <p>{itembis.platform.name}</p>
                                  </div>
                                );
                              })}
                          </div>
                          {item.name ? (
                            <h2>{item.name}</h2>
                          ) : (
                            <h2>Unknown title</h2>
                          )}
                          <div className="like-button">
                            <button>Add</button>
                            <FaPlus />
                          </div>
                        </section>
                      </section>
                    );
                  }
                })}
            </section>
            {/* ---------------------------- Ma navigation ---------------------------- */}
            {page === 1 ? (
              <section className="nav-pages">
                <section className="left-button-class"></section>
                <section className="right-button-class">
                  <button
                    className="right-but"
                    onClick={() => setPage(page + 1)}
                  >
                    <p> Next page </p>
                    <img src={arrowRight} />
                  </button>
                  <button
                    className="last-page-but"
                    onClick={() => setPage(lastPage)}
                  >
                    Go to last page
                  </button>
                </section>
              </section>
            ) : page > 1 && page < lastPage ? (
              <section className="nav-pages">
                <section className="left-button-class">
                  <button className="first-page-but" onClick={() => setPage(1)}>
                    Go back to first page
                  </button>
                  <button
                    className="left-but"
                    onClick={() => setPage(page - 1)}
                  >
                    <p>Previous page</p>
                    <img src={arrowLeft} />
                  </button>
                </section>
                <section className="left-button-class">
                  <button
                    className="right-but"
                    onClick={() => setPage(page + 1)}
                  >
                    <p> Next page </p>
                    <img src={arrowRight} />
                  </button>
                  <button
                    className="last-page-but"
                    onClick={() => setPage(lastPage)}
                  >
                    Go to last page
                  </button>
                </section>
              </section>
            ) : (
              <section className="nav-pages">
                <section className="left-button-class">
                  <button className="first-page-but" onClick={() => setPage(1)}>
                    Go back to first page
                  </button>
                  <button className="left-but">
                    <img src={arrowLeft} onClick={() => setPage(page - 1)} />
                  </button>
                </section>
                <p>Previous page</p>
                <section className="left-button-class"></section>
              </section>
            )}
          </section>
        </main>
        <Footer />
      </>
    );
  }
};

export default Home;
