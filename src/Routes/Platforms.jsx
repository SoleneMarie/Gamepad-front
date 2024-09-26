import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import PageNav from "../Components/PageNav";
import GetPicsById from "../Components/GetPicsById";

const Platforms = ({ token, id, logoutFunc }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [pageSize, setPageSize] = useState(40);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);

  useEffect(() => {
    setIsLoading(true);
    const fetchPlatformsFunc = async () => {
      try {
        const response = await axios.get(
          `https://site--gamepad--dk2vmt6fnyjp.code.run/platforms?page_size=${pageSize}&page=${page}`
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
    fetchPlatformsFunc();
  }, [page, count]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main>
          <LeftMenu token={token} id={id} logoutFunc={logoutFunc} />
          <section className="content" id="loading-content">
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
    console.log(data);
    return (
      <>
        <>
          <Header />
          <main>
            <section className="left-menu">
              <LeftMenu token={token} id={id} logoutFunc={logoutFunc} />
            </section>
            <section className="content">
              <section className="all-platforms-page">
                {data.map((item) => {
                  return (
                    <section className="one-platform-page" key={item.id}>
                      <div className="main-platform-img">
                        <img src={item.image_background} />
                      </div>
                      <section className="platform-description">
                        <h2>{item.name}</h2>
                      </section>
                      <p>
                        Best games on <span>{item.name}</span> :{" "}
                      </p>
                      <div className="best-games-platform">
                        {item.games &&
                          item.games.map((itemBis) => {
                            return (
                              <GetPicsById
                                name={itemBis.name}
                                id={itemBis.id}
                                key={itemBis.id}
                              />
                            );
                          })}
                      </div>
                    </section>
                  );
                })}
              </section>
              <PageNav page={page} setPage={setPage} lastPage={lastPage} />
              <Footer />
            </section>
          </main>
        </>
      </>
    );
  }
};
export default Platforms;
