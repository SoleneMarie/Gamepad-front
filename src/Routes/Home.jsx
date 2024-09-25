import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import placeHolder from "../pictures/placeholder.png";
import Header from "../Components/Header";
import MainBanner from "../Components/MainBanner";
import PageNav from "../Components/PageNav";
import Aubergines from "../pictures/aubergines.jpg";
import { BsExclamationTriangle } from "react-icons/bs";
import notFound from "../pictures/not-found.jpg";
import loading from "../pictures/loading.jpg";

const Home = ({ token, id, logoutFunc, search, setSearch }) => {
  const [ordering, setOrdering] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [count, setCount] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);

  console.log("id props : ", id);

  useEffect(() => {
    setIsLoading(true);
    const dataGamesFunc = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000?search=${search}&ordering=${ordering}&page=${page}&pagesize=${pageSize}`
        );
        setData(response.data.results);
        setCount(response.data.count);
        if (count === 0) {
          setLastPage(1);
        } else {
          if (count % pageSize === 0) {
            /*setLastPage(count / pageSize)*/
            if (count / pageSize < 250) {
              setLastPage(count / pageSize);
            } else {
              setLastPage(250);
            }
          } else {
            if (count / pageSize + 1 < 250) {
              setLastPage(Math.trunc(count / pageSize) + 1);
            } else {
              setLastPage(250);
            }
            /*setLastPage(Math.trunc(count / pageSize + 1));*/
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    dataGamesFunc();
  }, [ordering, search, page, count]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main>
          <LeftMenu token={token} id={id} logoutFunc={logoutFunc} />
          <section className="content" id="loading-content">
            <MainBanner
              search={search}
              setSearch={setSearch}
              setOrdering={setOrdering}
              count={count}
              page={page}
              setPage={setPage}
              lastPage={lastPage}
              isLoading={isLoading}
            />
            <section className="all-games">
              <section className="no-game-found">
                <img src={loading} />
                <p>...wait for it...</p>
              </section>
            </section>
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
          <LeftMenu token={token} id={id} logoutFunc={logoutFunc} />
          {/* -----------------------------------------------------------------------------------------------
          -------------------------------------------CONTENU PRINCIPAL --------------------------------------
          ------------------------------------------------------------------------------------------------- */}
          <section className="content">
            <MainBanner
              setOrdering={setOrdering}
              search={search}
              setSearch={setSearch}
              count={count}
              page={page}
              setPage={setPage}
              lastPage={lastPage}
              isLoading={isLoading}
            />
            {/* -------------------------------- RECUPERATION DU CONTENU -------------------------------- */}
            <section className="all-games">
              {data.length > 0 ? (
                data.map((item) => {
                  let idGame = item.id;
                  console.log("id jeux : ", idGame);
                  console.log("id user : ", id);
                  const arrTags = [];
                  if (item.tags) {
                    item.tags.map((tag) => {
                      return arrTags.push(tag.name);
                    });
                  }
                  console.log(arrTags);
                  if (
                    !item.name.includes("sex") &&
                    !item.name.includes("hentai") &&
                    !item.name.includes("Sex") &&
                    !item.name.includes("Hentai") &&
                    !item.name.includes("SEX") &&
                    !item.name.includes("HENTAI") &&
                    !arrTags.includes("NSFW") &&
                    !arrTags.includes("Sexual Content") &&
                    !arrTags.includes("hentai")
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
                        </section>
                      </section>
                    );
                  } else {
                    return (
                      <>
                        <section className="one-game" key={item.id}>
                          {item.background_image ? (
                            <div className="one-game-pic">
                              <Link to={`/game/${item.id}`}>
                                <img src={Aubergines} />
                              </Link>
                              <div className="minus-eighteen">
                                <BsExclamationTriangle />
                                <p>-18</p>
                              </div>
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
                          </section>
                        </section>
                      </>
                    );
                  }
                })
              ) : (
                <section className="all-games">
                  <section className="no-game-found">
                    <img src={notFound} />
                    <p>...found nothing here</p>
                  </section>
                </section>
              )}
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

export default Home;
