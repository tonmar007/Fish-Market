import { useState, useEffect } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import { useParams } from "react-router-dom";
import { db } from "../base";
import { doc, setDoc, deleteDoc, getDoc, onSnapshot } from "firebase/firestore"; 

function App() {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});
  const { storeId } = useParams();

  useEffect(() => {
    const localStorageRef = localStorage.getItem(storeId);
    if(localStorageRef){
      setOrder(JSON.parse(localStorageRef))
    }
    deleteDoc(doc(db, "fierce-drab-loaves", "fishes"));
    setDoc(doc(db, `${storeId}`, "fishes"), fishes);
  }, [fishes]);

  useEffect(() => {
    const dbRef = doc(db, `${storeId}`, "fishes");
    console.log("DB REF ", dbRef);
    // getDoc(dbRef)
    // .then((doc) => {
    //   console.log("IZ DBAAA ", doc.data());
    // })
    //const dbFishes = {};
    // console.log("Db fishesssss ", dbFishes);
    onSnapshot(dbRef, (doc) => {
      const dbFishes = doc.data();
      console.log("IZ BAZUUUU ", doc.data());
      console.log("FISHES BEFORE ", fishes);
      setFishes(dbFishes);
      console.log("FISHES AFTER ", fishes);
    })
          
  }, []);

  useEffect(() => {
    localStorage.setItem(
      storeId,
      JSON.stringify(order)
    );
  }, [order]);

  const addFish = fish => {
    const copyFishes = { ...fishes };
    copyFishes[`fish${Date.now()}`] = fish;
    setFishes(copyFishes);
  };

  const updateFish = (key, updatedFish) => {
    const copyFishes = { ...fishes };
    copyFishes[key] = updatedFish;
    setFishes(copyFishes)
  }

  const deleteFish = key => {
    console.log("Radi Savrseno ", key);
    const copyFishes = { ...fishes };
    console.log("Riba koja treba da se obrise je ", copyFishes[key]);
    // copyFishes[key] = null;
    // setFishes(copyFishes);
  }

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
        updateFish={updateFish}
        deleteFish={deleteFish}
        loadSampleFishes={loadSampleFishes}
        fishes={fishes}
      />
    </div>
  );
}

export default App;