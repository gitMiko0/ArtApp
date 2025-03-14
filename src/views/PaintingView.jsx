import React, { useState } from 'react';
import PaintingsList from "../components/PaintingsList";
import PaintingsFilter from '../components/PaintingsFilter';

const PaintingView = () => {
  const background = "/assets/loginBackground.jpg";

  const [filterType, setFilterType] = useState("artist"); // artist, genre, or gallery
  const [filterValue, setFilterValue] = useState("");
  const [sortOption, setSortOption] = useState("sortByTitle"); //initial state
  const [appliedFilter, setAppliedFilter] = useState({});

  return (
    <div
      className="pt-12 flex h-screen w-screen bg-cover bg-center overflow-y-auto"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex w-3/12">
        <PaintingsFilter 
          setAppliedFilter={setAppliedFilter}
        />
      </div>
      <div className="font-quicksand custom-scrollbar w-9/12">
          <PaintingsList 
            queryType={appliedFilter.type}
            queryValue={appliedFilter.value}
            defaultSort={sortOption}
            setSortOption={setSortOption}
            size="w_900"
            columns={3}
          />
      </div>
    </div>
  );
};

export default PaintingView;
