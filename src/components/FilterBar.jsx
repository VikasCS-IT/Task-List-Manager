import React from "react";

const FilterBar = ({ onFilter }) => {
    return (
        <div>
            <select onChange={(e) => onFilter(e.target.value)} className="border p-2 rounded">
                <option value="">All</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
        </div>
    );
};

export default FilterBar;
