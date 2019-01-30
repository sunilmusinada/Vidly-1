import React from "react";
const listgroup = ({
  items,
  selectedItem,
  textProperty,
  valueProperty,
  onSelectionChanged
}) => {
  //   const currentGenre = props.currentGenre;
  return (
    <div className="list-group">
      {items.map(item => (
        <button
          key={item[valueProperty]}
          type="button"
          className={
            selectedItem === item.name
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          onClick={() => onSelectionChanged(item)}
        >
          {item[textProperty]}
        </button>
      ))}
    </div>
  );
};
listgroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default listgroup;
