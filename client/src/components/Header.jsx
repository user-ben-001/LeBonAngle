import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserContext } from "../contexts/UserContext";
import { SearchBar } from "../components/SearchBar.jsx";
import { useAnnonces } from "../hooks/useAnnonces.js";

const Header = () => {
  const navigate = useNavigate();

  const [profilMenu, setProfilMenu] = useState(false);
  const { logout } = useAuth();
  const {
    categories,
    search,
    setSearch,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    categoryId,
    setCategoryId,
  } = useAnnonces();

  return (
    <>
      <div>
        <img src="#" alt="" />
        <button onClick={() => navigate("/")}>Accueil</button>
      </div>
      <SearchBar
        categories={categories}
        search={search}
        setSearch={setSearch}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />
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
