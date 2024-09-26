import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import Header from "../Components/Header";
import LoadFavourites from "../Components/LoadFavourites";
import notAutho from "../pictures/not-autho.webp";

const Profile = ({ token, logoutFunc }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const id = params.id;
  console.log(id);

  useEffect(() => {
    setIsLoading(true);
    const profileDataFunc = async () => {
      try {
        const response = await axios.get(
          `https://site--gamepad--dk2vmt6fnyjp.code.run/user/profile/${id}`
        );
        setData(response.data);
        console.log(data);
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
            <section className="all-menu">
              <LeftMenu token={token} logoutFunc={logoutFunc} />
            </section>
            <section className="profile">
              <section className="profile-infos">
                <div className="profile-details">
                  <div className="profile-pic">
                    <img src={data.picture} />
                  </div>
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
                      console.log(item);
                      return <LoadFavourites id={item} />;
                    })}
                </div>
              </section>
            </section>
          </main>{" "}
          <Footer />
        </>
      </>
    );
  } else if (!token) {
    return (
      <>
        <Header />
        <main>
          <section className="all-menu">
            <LeftMenu />
          </section>
          <section className="content">
            <section className="not-found">
              <div className="no-game-found">
                <img src={notAutho} />
                <p>Not authorized...</p>
              </div>
            </section>
          </section>
        </main>
        <Footer />
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
          </section>
        </main>
        <Footer />
      </>
    );
  }
};
export default Profile;
