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

const OneGame = () => {
  const param = useParams();
  const id = param.id;
  const [data, setData] = useState({});
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const getGame = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/game/${id}`);
        setData(response.data);

        setisLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getGame();
  }, []);

  if (isLoading) {
    return (
      <>
        <Header />
        <main>
          <section className="content">
            <LeftMenu />
            <p>Loading...</p>
            <Footer />
          </section>
        </main>
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
                {data.genres &&
                  data.genres.map((item) => {
                    return (
                      <Link to={`/genres/${item.id}`} key={item.id}>
                        <div className="one-game-genres">{item.name}</div>
                      </Link>
                    );
                  })}
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

                {data.website && <p className="website">{data.website}</p>}
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
