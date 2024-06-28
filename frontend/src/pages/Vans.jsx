import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
const url = "  http://localhost:3000/vans";

const Vans = () => {
  // --------------bob method------------
  // const [vans, setVans] = useState([]);
  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => setVans(data.Vans));
  // }, [url]);

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("type"));
  console.log(searchParams.toString());
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [vans, setVans] = useState([]);
  useEffect(() => {
    const fetchVans = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw Error("there is no data");
        }
        const data = await res.json();
        setIsLoading(false);
        setVans(data);
      } catch (error) {
        setIsError(error.message);
        setIsLoading(false);
      }
    };
    fetchVans();
  }, [url]);
  if (isLoading) {
    return <h2>....is loading</h2>;
  }
  if (isError) {
    return (
      <>
        <h2>Error</h2>
        <p>{isError}</p>
        <Link to="/">back to the home page</Link>
      </>
    );
  }

  const typeFilter = searchParams.get("type");
  const displayVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;
  return (
    <>
      <div className="van-list-container">
        <h1>Explore our van options</h1>
        <div className="van-list-filter-buttons">
          <button
            className={`van-type simple ${
              typeFilter === "simple" ? "selected" : null
            }`}
            onClick={() => setSearchParams({ type: "simple" })}
          >
            simple
          </button>
          <button
            className={`van-type rugged ${
              typeFilter === "rugged" ? "selected" : null
            }`}
            onClick={() => setSearchParams({ type: "rugged" })}
          >
            rugged
          </button>
          <button
            className={`van-type luxury ${
              typeFilter === "luxury" ? "selected" : null
            }`}
            onClick={() => setSearchParams({ type: "luxury" })}
          >
            luxury
          </button>
          <button className="van-type" onClick={() => setSearchParams({})}>
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
