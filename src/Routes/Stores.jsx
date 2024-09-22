import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import GetPicsById from "../Components/GetPicsById";

const Stores = ({ token, id }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getStoresFunc = async () => {
      try {
        const response = await axios.get("http://localhost:3000/stores");
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
        <section className="content">
          <LeftMenu token={token} id={id} />
          <p>Loading...</p>
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
        <section className="content">
          <LeftMenu token={token} id={id} />
          <section className="all-stores">
            {data &&
              data.map((item) => {
                return (
                  <section key={item.id} className="one-store">
                    <div>
                      <img src={item.image_background} />
                    </div>
                    <Link to={item.domain}>
                      <h2>{item.name}</h2>
                    </Link>
                    <p>
                      There are <span>{item.games_count}</span> available games
                      on {item.name}
                    </p>
                    <p>
                      Best rated games on <span>{item.name}</span> :{" "}
                    </p>
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
                );
              })}
          </section>
          <Footer />
        </section>
      </main>
    </>
  );
};
export default Stores;
