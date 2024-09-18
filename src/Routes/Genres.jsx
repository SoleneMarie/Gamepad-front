import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MainBanner from "../Components/MainBanner";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";

const Genres = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getGenresFunc = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/genres");
        console.log(response);
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getGenresFunc();
  }, []);

  if (isLoading) {
    return (
      <>
        <Header />
        <main>
          <LeftMenu />
          <section className="content">
            <MainBanner />
            <section className="all-genres-infos"></section>
            <p>Loading content</p>
          </section>
        </main>
        <Footer />
      </>
    );
  } else {
    console.log(data);
    return (
      <>
        <Header />
        <main>
          <LeftMenu />
          <section className="content">
            <MainBanner />
            <section className="all-genres-infos">
              {data &&
                data.map((item) => {
                  return (
                    <section className="one-genre" key={item.id}>
                      <div>
                        <Link to={`/games/${item.id}`}>
                          <img src={item.image_background} />
                        </Link>
                      </div>
                      <section className="one-genre-infos">
                        <h2>{item.name}</h2>
                        <p>See {item.games_count} games</p>
                        <h3>Best rated games for this genre </h3>
                        {item.games &&
                          item.games.map((itembis) => {
                            return (
                              <Link to={`/game/${itembis.id}`} key={itembis.id}>
                                <p>{itembis.name} </p>
                              </Link>
                            );
                          })}
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
