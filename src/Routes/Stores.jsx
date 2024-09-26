import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loading from "../pictures/loading.jpg";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import GetPicsById from "../Components/GetPicsById";

const Stores = ({ token, id, logoutFunc }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getStoresFunc = async () => {
      try {
        const response = await axios.get(
          "https://site--gamepad--dk2vmt6fnyjp.code.run/stores"
        );
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getStoresFunc();
  }, []);

  if (isLoading) {
    <>
      <Header />
      <main>
        <LeftMenu token={token} id={id} logoutFunc={logoutFunc} />
        <section className="content" id="loading-content">
          <section className="all-games">
            <section className="no-game-found">
              <img src={loading} />
              <p>...wait for it...</p>
            </section>
          </section>
          <Footer />
        </section>
      </main>
    </>;
  } else {
  }
  console.log(data);
  return (
    <>
      <Header />
      <main>
        <LeftMenu token={token} id={id} logoutFunc={logoutFunc} />
        <section className="content">
          <section className="all-stores">
            {data &&
              data.map((item) => {
                return (
                  <section key={item.id} className="one-store">
                    <div>
                      <img src={item.image_background} />
                    </div>
                    <Link to={`https://${item.domain}`} target="_blank">
                      <h2>{item.name}</h2>
                    </Link>
                    <div id="store-game-description">
                      <p>
                        Best games on <span>{item.name}</span>{" "}
                      </p>
                    </div>
                    <section className="all-stores-page">
                      {item.games &&
                        item.games.map((itemBis) => {
                          return (
                            <GetPicsById
                              name={itemBis.name}
                              key={itemBis.id}
                              id={itemBis.id}
                            />
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
};
export default Stores;
