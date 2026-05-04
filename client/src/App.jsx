import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login.jsx";
import Accueil from "./pages/Accueil.jsx";
import AllArticles from "./pages/AllArticles.jsx";
import Categories from "./pages/Categories.jsx";
import Article from "./pages/Article.jsx";
import AddArticle from "./pages/AddArticle.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Accueil />} />
          <Route path="/all-articles" element={<AllArticles />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/article" element={<Article />} />
          <Route path="/add-article" element={<AddArticle />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
