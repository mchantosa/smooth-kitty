import { useState } from "preact/hooks";

export const ItemsContainer = (props: any) => {
  // This should be a function that fetches items from a database.
  const defaultItems = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];
  // Pass the getter and setter into the controlled editing component (modal).
  const [items, setItems] = useState(defaultItems);
  const [activeItem, setActiveItem] = useState();
  return (
    <>
      {items.map((item: any) => (
        <>
          {/* This should be a component that renders a list. */}
          <div>
            {item.name}&nbsp;
            <button class="btn" onClick={() => setActiveItem(item)}>
              Make active
            </button>
          </div>
        </>
      ))}
      {/* This should be a component that renders a editable modal. */}
      {activeItem && <div>Active Item: {JSON.stringify(activeItem)}</div>}
    </>
  );
};
