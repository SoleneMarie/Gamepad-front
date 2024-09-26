import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import placeHolder from "../pictures/placeholder.png";
import { GoStarFill } from "react-icons/go";
import { Link } from "react-router-dom";
import CleanText from "../Components/CleanText";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import Header from "../Components/Header";
import SimilarGames from "../Components/SimilarGames";
import { FaPlus } from "react-icons/fa";

const OneGame = ({ token, id, logoutFunc }) => {
  const param = useParams();
  const idgame = param.id;
  const [data, setData] = useState({});
  const [dataScreens, setDataScreens] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingScreens, setIsLoadingScreens] = useState(false);
  const [buttonClass, setButtonClass] = useState("green");
  const [buttonText, setButtonText] = useState("Add");
  const [idGame, setIdGame] = useState("");

  /* ---------------- Ma fonction pour gérer les favoris ---------------- */

  const favoriteFunc = async (id, idGame) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/user/favorites/${id}`,
        { favorites: idGame }
      );
      console.log(response.data);
      if (response.data.message === "added to your favorites") {
        setButtonClass("red");
        setButtonText("Remove");
      } else {
        setButtonClass("green");
        setButtonText("Add");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ------------------------------------------------------------------- */

  useEffect(() => {
    const getGame = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(
          `http://site--gamepad--dk2vmt6fnyjp.code.run/game/${idgame}`
        );
        setData(response.data);
        setIdGame(response.data.id);

        setisLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getGame();
  }, []);

  useEffect(() => {
    setIsLoadingScreens(true);
    const fetchScreensFunc = async () => {
      try {
        const response = await axios.get(
          `http://site--gamepad--dk2vmt6fnyjp.code.run/game/${idgame}/screenshots`
        );
        setDataScreens(response.data.results);
        setIsLoadingScreens(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchScreensFunc();
  }, []);

  if (isLoading || isLoadingScreens) {
    return (
      <>
        <Header />
        <main>
          <section className="content">
            <LeftMenu token={token} id={id} logoutFunc={logoutFunc} />
            <p>Loading...</p>
          </section>
        </main>
        <Footer />
      </>
    );
  } else {
    console.log(data.id);
    return (
      <>
        <Header />
        <main>
          <LeftMenu token={token} id={id} logoutFunc={logoutFunc} />
          <section className="content" id="content-game">
            <section className="all-details-one-game">
              <h1>{data.name}</h1>
              <div className="one-game-big-pic">
                {data.background_image ? (
                  <img src={data.background_image} />
                ) : (
                  <img src={placeHolder} />
                )}
              </div>
              <section className="one-game-all-infos">
                <section className="infos-game-genres">
                  {data.genres &&
                    data.genres.map((item) => {
                      return (
                        <Link to={`/genres/${item.id}`} key={item.id}>
                          <div className="one-game-genres">
                            <h3>{item.name}</h3>
                          </div>
                        </Link>
                      );
                    })}
                  {token && (
                    <div className={buttonClass}>
                      <button
                        onClick={() => {
                          favoriteFunc(id, idGame);
                        }}
                      >
                        {buttonText}
                      </button>
                      <FaPlus />
                    </div>
                  )}
                </section>
                <CleanText data={data} />
                <div className="one-game-released">
                  <p>
                    Released on {data.released} by{" "}
                    {data.developers &&
                      data.developers.map((item) => {
                        return <span key={item.id}>{item.name}</span>;
                      })}
                  </p>
                </div>
                <section className="platforms-rating">
                  {data.platform &&
                    data.platforms.map((item) => {
                      return <p key={item.platform.id}>{item.platform.name}</p>;
                    })}
                  <div>
                    <GoStarFill />
                  </div>
                  <p>{data.rating}</p>
                </section>

                {data.website && (
                  <Link to={data.website} target="_blank">
                    <p className="website">{data.website}</p>
                  </Link>
                )}
              </section>
            </section>
            <section className="similar-games">
              {data.tags && data.tags.length > 0 ? (
                <SimilarGames id={data.tags[0].id} />
              ) : (
                <></>
              )}
            </section>
            <section className="carousel">
              <h2>{data.name} screenshots</h2>
              <section className="all-screens">
                {dataScreens.map((item) => {
                  return (
                    <div className="one-screenshot" key={item.id}>
                      <img src={item.image} />
                    </div>
                  );
                })}
              </section>
            </section>
          </section>
        </main>
        <Footer />
      </>
    );
  }
};
export default OneGame;
