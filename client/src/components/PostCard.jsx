const PostCard = (props) => {
  const data = props.data[0];

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
    </div>
  );
};

export default PostCard;
