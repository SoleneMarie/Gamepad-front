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
        const response = await axios.get(
          `http://site--gamepad--dk2vmt6fnyjp.code.run/game/${id}`
        );
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
        <section className="one-favourite-game">
          <div className="fav-img">
            {data.background_image ? (
              <img src={data.background_image} />
            ) : (
              <img src={placeHolder} />
            )}
          </div>
          <h3>{data.name}</h3>
          <div className="overflow">
            <CleanText data={data} />
          </div>
          <section className="platforms-rating-fav">
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
