"use client";

import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ShowUsername = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>("");

  useEffect(() => {
    setUsername(localStorage.getItem("username"));

    setIsLoading(false);
  }, []);

  return (
    <span className="text-hiwebGray-500">
      {!isLoading ? username : <Skeleton width={200} />}
    </span>
  );
};

export default ShowUsername;
