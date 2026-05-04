import { useState } from "react";
import Header from "../components/Header.jsx";

const AddArticle = () => {
  const [title, setTitle] = useState();
  const [price, setPrice] = usestate();
  const [description, setDescription] = usestate();
  const [image, setImage] = usestate();

  const newAnnonce = {};
  return (
    <>
      <Header />
      <h2>Ajoutez une annonce</h2>
      <form>
        <input type="text" placeholder="Titre" required /> <br />
        <input type="text" placeholder="Prix" required /> <br />
        <textarea type="text" placeholder="Description" />
        <p>Ajoutez un image (opt)</p>
        <input type="file" />
      </form>
    </>
  );
};

export default AddArticle;
