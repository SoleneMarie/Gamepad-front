import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import Header from "../Components/Header";
import CleanText from "../Components/CleanText";
import { GoStarFill } from "react-icons/go";

const Profile = ({ token, logoutFunc }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /* Ma fonction pour récupérer le data des jeux favoris */
  const getFavouritesFunc = async (id) => {
    try {
      const response = await axios.get(`/game/${id}`);
      return (
        <>
          <section className="one-game">
            <div>
              <img src={response.data.background_image} />
            </div>
            <h2>{response.data.name}</h2>
            <CleanText data={response.data} />
            <section className="platforms-rating">
              {response.data.platform &&
                response.data.platforms.map((item) => {
                  return <p key={item.platform.id}>{item.platform.name}</p>;
                })}
              <div>
                <GoStarFill />
              </div>
              <p>{response.data.rating}</p>
            </section>
          </section>
        </>
      );
    } catch (error) {
      console.log(error);
    }
  };

  /* --------------------------------------------------- */

  const params = useParams();
  const id = params.id;
  console.log(id);

  useEffect(() => {
    setIsLoading(true);
    const profileDataFunc = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/profile/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    profileDataFunc();
  }, []);

  if (token && !isLoading) {
    console.log(data);
    return (
      <>
        <>
          <Header />
          <main>
            <section className="content">
              <LeftMenu token={token} logoutFunc={logoutFunc} />
              <section className="profile">
                <section className="profile-infos">
                  <div className="profile-pic">
                    <img src={data.picture} />
                  </div>
                  <div className="profile-details">
                    <h2>{data.username}</h2>
                    <h3> My mail </h3>
                    <p> {data.email}</p>
                    <h3>My password</h3>
                    <button> Click to change password </button>
                  </div>
                </section>
                <section className="profile-favourites">
                  <h2> My favourite games </h2>
                  <div className="profile-favourite-games">
                    {data.favourites &&
                      data.favourites.map((item) => {
                        getFavouritesFunc(item);
                      })}
                  </div>
                </section>
              </section>

              <Footer />
            </section>
          </main>
        </>
      </>
    );
  } else if (!token) {
    return (
      <>
        <Header />
        <main>
          <section className="content">
            <LeftMenu />
            <p>Not authorized</p>
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
          <section className="content">
            <LeftMenu token={token} logoutFunc={logoutFunc} />
            <p>Loading...</p>
            <Footer />
          </section>
        </main>
      </>
    );
  }
};
export default Profile;
