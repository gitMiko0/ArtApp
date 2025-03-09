import React from 'react';
/**
 * A reusable component for displaying a sorted list of items.
 * 
 * @param {Object} props - Component properties
 * @param {string} props.header - The title of the list
 * @param {Array} props.data - The array of items to be displayed
 * @param {string} props.sortBy - The property name to sort the items by
 * @param {any} props.selectedId - The ID of the currently selected item
 * @param {Function} props.onItemClick - Function to call when an item is clicked
 * @param {string} props.itemKey - The property name to use as the unique key for each item
 * @param {Function} props.renderItem - A function that defines how each item should be rendered
 * 
 * @returns {JSX.Element} The sorted list component
 */

const SortedList = ({ 
  header, 
  data, 
  sortBy, 
  selectedId, 
  onItemClick, 
  itemKey,
  renderItem 
}) => {
  return (
    <div>
      <h2 className="font-bold font-alexbrush text-4xl">{header}</h2>
      <ul>
        {data
          .sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
          .map((item) => (
            <li
              key={item[itemKey]}
              className={`font-semibold rounded-xl cursor-pointer p-2 m-4 rounded transition-colors duration-300  ${
                selectedId === item[itemKey]
                  ? "rounded-xl bg-[#21130d] text-white"
                  : "bg-white bg-opacity-30 backdrop-blur hover:bg-opacity-50 hover:bg-[#21130d] hover:text-white"
              }`}
              onClick={() => onItemClick(item[itemKey])}
            >
              {renderItem(item)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SortedList;
