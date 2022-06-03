import { useState, useEffect } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import { useParams } from "react-router-dom";
import { db } from "../base";
import { doc, setDoc, deleteDoc } from "firebase/firestore"; 

function App() {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});
  const { storeId } = useParams();

  useEffect(() => {
    deleteDoc(doc(db, "sparkling-angry-leaves", "fishes"));
    setDoc(doc(db, `${storeId}`, "fishes"), fishes);
  }, [fishes]);

  const addFish = fish => {
    setFishes({ ...fishes, fish });
  };

  const loadSampleFishes = () => {
    setFishes(sampleFishes);
  }

  const addToOrder = (key) => {
    const orderCopy = { ...order};
    orderCopy[key] = orderCopy[key] + 1 || 1;
    setOrder(orderCopy);
  }

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {
            Object.keys(fishes).map(key => (
            <Fish 
              key={key}
              index={key}
              fish={fishes[key]}
              addToOrder={addToOrder}
            />
            ))
            //fishes.map(fish => <Fish key={fish} />)
          }
        </ul>
      </div>
      <Order 
        fishes={fishes}
        order={order}
      />
      <Inventory 
        addFish={addFish} 
        loadSampleFishes={loadSampleFishes}
      />
    </div>
  );
}

export default App;