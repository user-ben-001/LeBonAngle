import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import PostCard from "../components/PostCard.jsx";
import { UserContext } from "../contexts/UserContext.jsx";

const Accueil = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(import.meta.env.VITE_API_URL+"/annonces/", {
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setData(result.result[0]);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      {data?.map((e) => (
        <PostCard data={e} />
      ))}
    </>
  );
};

export default Accueil;
