import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login.jsx";
import Accueil from "./pages/Accueil.jsx";
import AllArticles from "./pages/AllArticles.jsx";
import Categories from "./pages/Categories.jsx";
import Article from "./pages/Article.jsx";
import AddArticle from "./pages/AddArticle.jsx";
import { PrivateRoute } from "./components/PrivateRoutes.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Accueil />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-articles"
          element={
            <PrivateRoute>
              <AllArticles />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route
          path="/article"
          element={
            <PrivateRoute>
              <Article />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-article"
          element={
            <PrivateRoute>
              <AddArticle />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
