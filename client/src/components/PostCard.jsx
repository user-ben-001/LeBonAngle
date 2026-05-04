import { useNavigate } from "react-router-dom";

const PostCard = (props) => {
  const navigate = useNavigate();

  const data = props.data;

  const pic = data.pictures;
  const title = data.title;
  const description = data.description;
  const price = data.price;

  return (
    <div>
      <img src={pic} alt="" />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p> {price}€ </p>
      </div>
      <button
        onClick={() => {
          navigate("#" + data.id);
        }}
      >
        Voir l'annonce
      </button>
    </div>
  );
};

export default PostCard;
