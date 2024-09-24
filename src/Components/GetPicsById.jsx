import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const GetPicsById = ({ name, id }) => {
  const [dataMin, setDataMin] = useState({});
  const [isLoadingMin, setIsLoadingMin] = useState(false);

  useEffect(() => {
    setIsLoadingMin(true);
    const getPicFunc = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/game/${id}`);
        setDataMin(response.data);
        setIsLoadingMin(false);
      } catch (error) {
        console.log(error);
      }
    };

    getPicFunc();
  }, []);

  if (!isLoadingMin && dataMin) {
    return (
      <section key={id} className="best-rated-one-div">
        <Link to={`/game/${id}`}>
          <div className="miniature-pic">
            <img src={dataMin.background_image} />
          </div>
          <p>{name}</p>
        </Link>
      </section>
    );
  }
};
export default GetPicsById;
