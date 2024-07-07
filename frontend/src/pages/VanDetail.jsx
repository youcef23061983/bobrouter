import { useParams, Link, useLocation, useLoaderData } from "react-router-dom";
import { getVans } from "./API";
export const loader = async ({ params }) => {
  return getVans(params.id);
};

const VanDetail = () => {
  const location = useLocation();
  const van = useLoaderData();
  return (
    <div className="van-detail-container">
      <Link
        to={`..${location.state?.search || ""}`}
        relative="path"
        className="back-button"
      >
        &larr;
        <span>Back to {location.state?.search.slice(6) || "all"} vans</span>
      </Link>
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default VanDetail;
