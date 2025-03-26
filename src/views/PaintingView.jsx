import React, { useState } from 'react';
import PaintingsList from "../components/PaintingsList";
import PaintingsFilter from '../components/PaintingsFilter';

const PaintingView = () => {
  const background = "/assets/loginBackground.jpg";

  const [sortOption, setSortOption] = useState("sortByTitle"); // title as default sort
  const [appliedFilter, setAppliedFilter] = useState({});

  return (
    <div
      className="pt-12 flex h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex w-3/12">
        <PaintingsFilter 
          setAppliedFilter={setAppliedFilter}
        />
      </div>
      <div className="font-quicksand custom-scrollbar w-9/12 overflow-y-auto">
        <div>
          <PaintingsList 
            queryType={appliedFilter.type}
            queryValue={appliedFilter.value}
            defaultSort={sortOption}
            setSortOption={setSortOption}
            size="w_800"
            columns={3}
          />
        </div>
      </div>
    </div>
  );
};

export default PaintingView;
