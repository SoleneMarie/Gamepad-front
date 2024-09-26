import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import GetPicsById from "../Components/GetPicsById";
import loading from "../pictures/loading.jpg";
const Genres = ({ token, id, logoutFunc }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getGenresFunc = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://site--gamepad--dk2vmt6fnyjp.code.run/genres"
        );
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log("erreur: ", error);
      }
    };
    getGenresFunc();
  }, []);

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
    return (
      <>
        <Header />
        <main>
          <LeftMenu token={token} id={id} logoutFunc={logoutFunc} />
          <section className="content">
            <section className="all-genres-infos">
              {data &&
                data.map((item) => {
                  console.log(item.id);
                  return (
                    <section className="one-genre" key={item.id}>
                      <div className="one-genre-main-div">
                        {console.log(`/games/${item.id}`)}
                        <Link to={`/games/${item.id}`}>
                          <img
                            className="one-genre-main-img"
                            src={item.image_background}
                          />
                        </Link>
                      </div>
                      <section className="one-genre-infos">
                        <h2>{item.name}</h2>
                        <p>See {item.games_count} games</p>
                        <section className="example-games">
                          <h3>Best rated games for this genre </h3>
                          {item.games &&
                            item.games.map((itemBis) => {
                              return (
                                <GetPicsById
                                  name={itemBis.name}
                                  key={itemBis.id}
                                  id={itemBis.id}
                                />
                              );
                            })}
                        </section>
                      </section>
                    </section>
                  );
                })}
            </section>
          </section>
        </main>
        <Footer />
      </>
    );
  }
};
export default Genres;
