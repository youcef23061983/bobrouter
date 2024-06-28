import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

const VanDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [van, setVan] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  console.log(location);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/vans/${id}`);
        if (!response.ok) {
          throw new Error("There is no data");
        }
        const data = await response.json();
        setIsLoading(false);
        setVan(data);
      } catch (error) {
        setIsError(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{isError}</h2>;
  }
  return (
    <div className="van-detail-container">
      <Link
        to={`?..${location.state?.search || ""}`}
        relative="path"
        className="back-button"
      >
        &larr;
        <span>Back to {location.state?.search.slice(6) || "all"} vans</span>
      </Link>
      <div className="van-detail">
        <img alt={van.name} src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    </div>
  );
};

export default VanDetail;
