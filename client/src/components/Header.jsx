import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const navigate = useNavigate();

  const [profilMenu, setProfilMenu] = useState(false);
  const { logout } = useContext(UserContext);

  return (
    <>
      <div>
        <img src="#" alt="" />
        <button onClick={() => navigate("/")}>Accueil</button>
      </div>
      <div>
        <input name="searchBar" id="searchBar" placeholder="Recherche" />
        <button id="searchButton">rechercher</button>
      </div>
      <div>
        <button onClick={() => navigate("/all-articles")}>
          Toutes les offres
        </button>
        <button onClick={() => navigate("/categories")}>Catégories</button>
        <button onMouseEnter={() => setProfilMenu(true)}>profil</button>
      </div>
      {profilMenu && (
        <div onMouseLeave={() => setProfilMenu(false)}>
          <button>Mon profil</button>
          <button onClick={() => navigate("/add-article")}>
            Ajouter une annonce
          </button>
          <button onClick={() => logout()}>Déconnexion</button>
        </div>
      )}
    </>
  );
};
export default Header;
