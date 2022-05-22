import { useState } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";

function App() {
  const [fishes, setFishes] = useState([]);
  const [order, setOrder] = useState("");

  const addFish = fish => {
    setFishes([ ...fishes, fish ]);
  };

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
      </div>
      <Order />
      <Inventory addFish={addFish} />
    </div>
  );
}

export default App;