import { useContext, useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import PostCard from "../components/PostCard.jsx";
import { UserContext } from "../contexts/UserContext.jsx";

const Accueil = () => {
  const [data, setData] = useState();
  const { accessToken } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/annonces/");
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
