import React, { useState } from 'react';
import PaintingsList from "../components/PaintingsList";
import PaintingsFilter from '../components/PaintingsFilter';

const PaintingView = () => {
  const background = "/assets/loginBackground.jpg";

  const [filterType, setFilterType] = useState("artist"); // artist, genre, or gallery
  const [filterValue, setFilterValue] = useState("");
  const [sortOption, setSortOption] = useState("sortByTitle");

  return (
    <div
      className="pt-12 flex h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex w-4/12">
        <PaintingsFilter 
          filterType={filterType}
          setFilterType={setFilterType}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      </div>
      <div className="font-quicksand custom-scrollbar w-9/12">
        <PaintingsList 
          queryType={filterType}
          queryValue={filterValue}
          defaultSort={sortOption}
          setSortOption={setSortOption}
          columns={2}
        />
      </div>
    </div>
  );
};

export default PaintingView;
