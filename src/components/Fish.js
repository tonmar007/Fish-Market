import { formatPrice } from "../helpers";

function Fish({ fish, addToOrder, index }) {
  const { image, name, price, desc, status } = fish;
  const isAvailable = status === "available";

  return(
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>  
      </h3>
      <p>{desc}</p>
      <button 
        disabled={!isAvailable} 
        onClick={() => addToOrder(index)}
      >
        {isAvailable ? "Add To Order" : "Sold Out!"}
      </button>
    </li>
  )
}

export default Fish;