import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { FaPlus } from "react-icons/fa";
import placeHolder from "../pictures/placeholder.png";

const Home = () => {
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const dataGamesFunc = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000?search=${search}&ordering=${ordering}`
        );
        setData(response.data.results);
        setCount(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    dataGamesFunc();
  }, [ordering, search]);
  console.log(data);
  if (isLoading) {
    return (
      <>
        <Header setSearch={setSearch} setOrdering={setOrdering} count={count} />
        <p>Loading, please wait...</p>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Header setSearch={setSearch} setOrdering={setOrdering} count={count} />
        <main>
          <nav className="menu">
            <button>HOME</button>
            <button>GENRES</button>
            <button>PLATFORMS</button>
            <button>REVIEWS</button>
            <button>STORE</button>
          </nav>

          {/* -----------------------------------------------------------------------------------------------
          -------------------------------------------CONTENU PRINCIPAL --------------------------------------
          ------------------------------------------------------------------------------------------------- */}
          <section className="content">
            {/* ------------------------------- TITRE, BARRE DE RECHERCHE -------------------------------- */}

            {/* -------------------------------- RECUPERATION DU CONTENU -------------------------------- */}
            <section className="all-games">
              {data.length > 0 &&
                data.map((item) => {
                  if (
                    !item.name.includes("sex") &&
                    !item.name.includes("hentai") &&
                    !item.name.includes("Sex") &&
                    !item.name.includes("Hentai")
                  ) {
                    return (
                      <section className="one-game" key={item.id}>
                        {item.background_image ? (
                          <div className="one-game-pic">
                            <img src={item.background_image} />
                          </div>
                        ) : (
                          <div className="one-game-pic">
                            <img src={placeHolder} />
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
          </section>
        </main>
        <Footer />
      </>
    );
  }
};

export default Home;
