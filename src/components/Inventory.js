import AddFishForm from "./AddFishForm";

function Inventory({addFish}) {
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      <AddFishForm addFish={addFish} />
    </div>
  );
}

export default Inventory;