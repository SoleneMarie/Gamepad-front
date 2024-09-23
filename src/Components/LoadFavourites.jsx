import { useState, useEffect } from "react";
import placeHolder from "../pictures/placeholder.png";
import CleanText from "../Components/CleanText";
import { GoStarFill } from "react-icons/go";
import axios from "axios";

const LoadFavourites = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const getFavouritesFunc = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/game/${id}`);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getFavouritesFunc();
  }, []);

  if (!isLoading) {
    return (
      <>
        <section className="one-game">
          <div>
            {data.background_image ? (
              <img src={data.background_image} />
            ) : (
              <img src={placeHolder} />
            )}
          </div>
          <h2>{data.name}</h2>
          <CleanText data={data} />
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
        </section>
      </>
    );
  }
};

export default LoadFavourites;
