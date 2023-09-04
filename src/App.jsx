import { useState } from "react";

import Button from "./components/UI/Button/Button";
import GetText from "./components/AddField/GetText";
import Store from "./components/ListItems/Store";

import classes from "./App.module.css";

const DUMMY_DATA = [
  { name: "Costco", items: ["Milk", "Eggs", "Bananas"] },
  { name: "Safeway", items: ["Grapes", "Bread", "Chips"] },
];

const App = () => {
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);
  const [storeData, setStoreData] = useState(DUMMY_DATA);

  const openAddStore = () => {
    setIsAddStoreOpen(true);
  };

  const closeAddStore = () => {
    setTimeout(() => {
      setIsAddStoreOpen(false);
    }, 300);
  };

  const addStoreHandler = (newStore) => {
    setStoreData((prevState) => {
      return [...prevState, newStore];
    });
    closeAddStore();
  };

  const updateStoreHandler = (storeName, itemList) => {
    const index = storeData.findIndex((store) => store.name === storeName);

    setStoreData((prevState) => {
      let newList = [...prevState];
      if (itemList.length < 1) {
        newList.splice(index, 1);
        return newList;
      }

      newList[index] = { ...newList[index], items: itemList };
      console.log(newList);
      return newList;
    });
  };

  const storeList = storeData.map((store) => {
    return (
      <Store
        key={store.name}
        store={store}
        onUpdateStore={updateStoreHandler}
      />
    );
  });

  return (
    <>
      {isAddStoreOpen && (
        <GetText
          onClose={closeAddStore}
          onAddStore={addStoreHandler}
          inputFor='Store'
        />
      )}
      <Button className={classes["new-store"]} onClick={openAddStore}>
        New Store
      </Button>
      {storeList}
    </>
  );
};

export default App;
