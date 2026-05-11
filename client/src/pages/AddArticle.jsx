import { useContext, useState } from "react";
import Header from "../components/Header.jsx";
import { UserContext } from "../contexts/UserContext.jsx";

const AddArticle = () => {
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [picture, setPicture] = useState();

  const { userInfo } = useContext(UserContext);

  const newAnnonce = {
    price: price,
    title: title,
    description: description,
    pictures: picture,
    user_id: userInfo.id,
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!price || !title) {
        alert("Titre et prix obligatoires");
      }

      console.log(newAnnonce);

      await fetch("http://localhost:3000/annonces/", {
        method: "POST",
        body: JSON.stringify(newAnnonce),
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
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
          type="text"
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
        <p>Ajoutez un image (opt)</p>
        <input type="file" onChange={(e) => setPicture(e.target.value)} />
        <button type="submit">Poster</button>
      </form>
    </>
  );
};

export default AddArticle;
