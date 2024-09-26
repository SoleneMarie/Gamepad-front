import axios from "axios";
import { useEffect, useState } from "react";
import placeHolder from "../pictures/placeholder.png";
import { Link } from "react-router-dom";

const SimilarGames = ({ id }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getSimilarFunc = async () => {
      try {
        const response = await axios.get(
          `https://site--gamepad--dk2vmt6fnyjp.code.run?tags=${id}&page_size=6&ordering=rating`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getSimilarFunc();
  }, []);
  if (!isLoading) {
    console.log("data récupéré : ", data);
    return (
      <>
        <h2> Discover similar games </h2>
        <section className="all-similar-games">
          {data.results &&
            data.results.map((item) => {
              return (
                <section className="oneGame" key={item.id}>
                  <Link to={`/game/${item.id}`}>
                    <div>
                      {item.background_image ? (
                        <img src={item.background_image} />
                      ) : (
                        <img src={placeHolder} />
                      )}
                    </div>
                  </Link>
                  <h3>{item.name}</h3>
                </section>
              );
            })}
        </section>
      </>
    );
  }
};

export default SimilarGames;
