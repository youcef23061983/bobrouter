import { useOutletContext } from "react-router-dom";

import React from "react";

const HostVanPhotos = () => {
  const { currentVan } = useOutletContext();

  return <img src={currentVan.imageUrl} className="host-van-detail-image" />;
};

export default HostVanPhotos;
