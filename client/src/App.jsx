import { Routes, Route } from "react-router-dom";
import "./App.css";

import Accueil from "./pages/Accueil.jsx";
import AllArticles from "./pages/AllArticles.jsx";
import Categories from "./pages/Categories.jsx";
import Article from "./pages/Article.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="all-articles" element={<AllArticles />} />
        <Route path="categories" element={<Categories />} />
        <Route path="article" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
