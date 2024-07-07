import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { getVans } from "./API";
export const loader = async () => {
  return getVans();
};

const Vans = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("type"));
  console.log(searchParams.toString());

  const vans = useLoaderData();

  const typeFilter = searchParams.get("type");
  const displayVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;
  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }
  return (
    <>
      <div className="van-list-container">
        <h1>Explore our van options</h1>
        <div className="van-list-filter-buttons">
          <button
            className={`van-type simple ${
              typeFilter === "simple" ? "selected" : null
            }`}
            onClick={() => handleFilterChange("type", "simple")}
          >
            simple
          </button>
          <button
            className={`van-type rugged ${
              typeFilter === "rugged" ? "selected" : null
            }`}
            onClick={() => handleFilterChange("type", "rugged")}
          >
            rugged
          </button>
          <button
            className={`van-type luxury ${
              typeFilter === "luxury" ? "selected" : null
            }`}
            onClick={() => handleFilterChange("type", "luxury")}
          >
            luxury
          </button>
          <button
            className="van-type"
            onClick={() => handleFilterChange("type", null)}
          >
            clear filters
          </button>
        </div>
        <div className="van-list">
          {displayVans.map((van) => (
            <div key={van.id} className="van-tile">
              <Link
                to={van.id}
                state={{ search: `?${searchParams.toString()}` }}
              >
                <img alt={van.name} src={van.imageUrl} />
                <div className="van-info">
                  <h3>{van.name}</h3>
                  <p>
                    ${van.price}
                    <span>/day</span>
                  </p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Vans;
