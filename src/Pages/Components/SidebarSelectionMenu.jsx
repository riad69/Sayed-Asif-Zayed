import React, { useState } from "react";
import { menuData } from "../data/menuData";

const SidebarSelectionMenu = ({ handleCheckboxChange, visibleColumns }) => {
  const [checkedItems, setCheckedItems] = useState(
    Object.fromEntries(
      menuData.map((item) => [item.name, visibleColumns[item.name] || true])
    )
  );

  const handleCheckbox = (name) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [name]: !checkedItems[name],
    };
    setCheckedItems(updatedCheckedItems);
    handleCheckboxChange(updatedCheckedItems);
  };

  return (
    <div className="bg-white shadow-xl h-[84.3%] w-[300px] absolute right-0 top-20 p-5">
      <ul className="flex flex-col gap-4">
        {menuData.map((item) => (
          <li key={item?.no}>
            <input
              type="checkbox"
              checked={checkedItems[item?.name] || false}
              id={`checkbox-${item?.name}`}
              onChange={() => handleCheckbox(item?.name)}
            />
            <label htmlFor={`checkbox-${item?.name}`} className="ml-2">
              {" "}
              {item?.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarSelectionMenu;
