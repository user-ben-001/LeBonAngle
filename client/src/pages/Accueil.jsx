import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import PostCard from "../components/PostCard.jsx";
import { UserContext } from "../contexts/UserContext.jsx";
import { useAnnonces } from "../hooks/useAnnonces.js";

const Accueil = () => {
  const { isLoading, error, annonces } = useAnnonces();

  return (
    <>
      <Header />
      {isLoading && <p>Chargement des annonces...</p>}
      {error && <p>Erreur : {error}</p>}
      {!isLoading &&
        !error &&
        annonces.map((annonce) => <PostCard data={annonce} />)}
    </>
  );
};

export default Accueil;
