import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import Header from "../Components/Header";

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
                    {/* Liste de jeux favoris à insérer ici */}
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
