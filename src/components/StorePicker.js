import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getFunName } from "../helpers";

function StorePicker() {
  const myInput = useRef();
  const navigate = useNavigate();

  const goToStore = event => {
    event.preventDefault();
    const storeName = myInput.current.value;
    navigate(`/store/${storeName}`);
  };

    return (
      <form className="store-selector" onSubmit={goToStore}>
        <h2>Please enter a store</h2>
        <input 
          type="text"
          ref={myInput}
          required 
          placeholder="Store Name" 
          defaultValue={getFunName()} 
        />
        <button type="submit">Visit Store</button>
      </form>
    );
}

export default StorePicker;