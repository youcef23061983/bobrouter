import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const url = "  http://localhost:3000/vans";

const HostVan = () => {
  const [vans, setVans] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
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

  const hostVansEls = vans.map((van) => (
    <Link to={van.id} key={van.id} className="host-van-link-wrapper">
      <div className="host-van-single" key={van.id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">{hostVansEls}</div>
    </section>
  );
};
export default HostVan;
