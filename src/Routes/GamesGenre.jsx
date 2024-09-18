import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Header from "../Components/Header";
import MainBanner from "../Components/MainBanner";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import placeHolder from "../pictures/placeholder.png";
import PageNav from "../Components/PageNav";

const GameGenre = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [count, setCount] = useState(1);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);

  const param = useParams();
  const genreId = param.genre;

  useEffect(() => {
    setIsLoading(true);
    const gamesGenreFunc = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/games/${genreId}?pagesize=${pageSize}&search=${search}&ordering=${ordering}&page=${page}`
        );
        setData(response.data.results);
        setCount(response.data.count);
        if (Number(count % pageSize) === 0) {
          setLastPage(count / pageSize);
        } else {
          setLastPage(Math.trunc(Number(count / pageSize + 1)));
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    gamesGenreFunc();
  }, [ordering, search, page, count]);

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
            <section className="all-genres-infos"></section>
          </section>
        </main>
        <Footer />
      </>
    );
  } else {
    console.log("data reçu : ", data);
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
            />
            <section className="all-genres-infos">
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
            <PageNav page={page} setPage={setPage} lastPage={lastPage} />
          </section>
        </main>
        <Footer />
      </>
    );
  }
};
export default GameGenre;
