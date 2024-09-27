import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { FaMinus } from "react-icons/fa";

const GetUserCookie = ({ idGame }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [idGamesArr, setidGamesArr] = useState([]);
  const [userId, setUserId] = useState("");
  const [add, setAdd] = useState(true);
  const [loadFavourites, setLoadfavourites] = useState(false);
  console.log("l'id de ce jeu: ", idGame);

  const favoriteFunc = async (userId, idGame) => {
    setLoadfavourites(true);
    try {
      const response = await axios.put(
        `https://site--gamepad--dk2vmt6fnyjp.code.run/user/favorites/${userId}`,
        { favorites: idGame }
      );
      console.log("mon tableau d'id", idGamesArr);
      console.log("data récupéré au clic", response.data);

      if (idGamesArr.includes(idGame)) {
        setAdd(false);
      } else {
        setAdd(true);
      }
      setLoadfavourites(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    console.log("mon cookie id: ", Cookies.get("id"));
    const getUserFunc = async () => {
      setUserId(Cookies.get("id"));
      const User = Cookies.get("id");
      try {
        const response = await axios.get(
          `https://site--gamepad--dk2vmt6fnyjp.code.run/user/profile/${User}`
        );
        console.log("profil récupéré : ", response.data);
        setidGamesArr(response.data.favourites);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUserFunc();
  }, [add]);

  console.log("trouvé en bdd : ", idGamesArr.includes(idGame));
  console.log(add);
  if (!isLoading && !loadFavourites) {
    console.log("l ID du jeu", idGame);

    return (
      <>
        {add === true ? (
          <div
            className="favorites-div"
            style={{ backgroundColor: "rgb(156, 37, 37)" }}
          >
            <button
              onClick={() => {
                favoriteFunc(userId, idGame);
              }}
            >
              Remove
            </button>
            <FaMinus />
          </div>
        ) : (
          <div className="favorites-div">
            <button
              onClick={() => {
                favoriteFunc(userId, idGame);
              }}
            >
              Add
            </button>
            <FaPlus />
          </div>
        )}
      </>
    );
  }
};

export default GetUserCookie;
