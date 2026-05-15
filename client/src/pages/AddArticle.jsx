import { useState } from "react";
import Header from "../components/Header.jsx";
import { useAuth, UserContext } from "../contexts/UserContext.jsx";
import { useAnnonces } from "../hooks/useAnnonces.js";

const AddArticle = () => {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [picture, setPicture] = useState();
  const [categoryId, setCategoryId] = useState();

  const { categories } = useAnnonces();

  const { userInfo } = useAuth();

  const newAnnonce = {
    price: price,
    title: title,
    description: description,
    pictures: picture,
    user_id: userInfo.id,
    category_id: categoryId,
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!price || !title) {
        alert("Titre et prix obligatoires");
      }

      //   console.log(newAnnonce);

      await fetch(import.meta.env.VITE_API_URL + "/annonces/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAnnonce),
      });
      console.log(newAnnonce);
      
      alert("Annonce créée");
      setTitle("");
      setPrice("");
      setDescription("");
      setPicture("");
    } catch (error) {
      alert("Erreur : " + error.message);
    }
  };

  return (
    <>
      <Header />
      <h2>Ajoutez une annonce</h2>
      <form onSubmit={HandleSubmit}>
        <input
          type="text"
          placeholder="Titre"
          required
          autoFocus
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <br />
        <input
          type="number"
          placeholder="Prix"
          required
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <br />
        <textarea
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <br />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Toutes les Catégories</option>
          {categories.map((cat) => {
            return (
              <option value={cat.id} key={cat.id}>
                {cat.title}
              </option>
            );
          })}
        </select>
        <p>Ajoutez un image (opt)</p>
        <input type="file" onChange={(e) => setPicture(e.target.value)} />
        <button type="submit">Poster</button>
      </form>
    </>
  );
};

export default AddArticle;
