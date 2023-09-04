import { useState } from "react";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import GetText from "../AddField/GetText";
import Item from "./Item";

import classes from "./Store.module.css";

const Store = (props) => {
  const store = props.store;
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  const openAddItemHandler = () => {
    setIsAddItemOpen(true);
  };

  const closeAddItemHandler = () => {
    setTimeout(() => {
      setIsAddItemOpen(false);
    }, 300);
  };

  const addItemHandler = (item) => {
    const updatedItemList = store.items.concat(item);
    props.onUpdateStore(store.name, updatedItemList);
  };

  const removeItemHandler = (itemToRemove) => {
    const updatedItemList = store.items.filter((item) => item !== itemToRemove);
    props.onUpdateStore(store.name, updatedItemList);
  };

  const itemList = store.items.map((item) => {
    return <Item key={item} item={item} onRemoveItem={removeItemHandler} />;
  });

  return (
    <>
      {isAddItemOpen && (
        <GetText
          inputFor='Item'
          onClose={closeAddItemHandler}
          onAddItem={addItemHandler}
        />
      )}
      <Card className={classes.store}>
        <div className={classes["store__header"]}>
          <h1 className={classes["store__title"]}>{store.name}</h1>
          <Button onClick={openAddItemHandler}>+</Button>
        </div>
        {itemList}
      </Card>
    </>
  );
};

export default Store;
