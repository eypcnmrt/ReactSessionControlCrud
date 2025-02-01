import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

interface FoodItemProps {
  id: number;
  image: string;
  name: string;
  cuisine: string;
  difficulty: string;
  caloriesPerServing: number;
  index: number;
}

const FoodListItem: React.FC<FoodItemProps> = ({
  id,
  image,
  name,
  cuisine,
  difficulty,
  caloriesPerServing,
  index,
}) => {
  return (
    <li
      key={id}
      className={`border-b  flex items-center py-2 justify-between ${
        index % 2 === 0 ? 'bg-list' : 'bg-list2'
      }`}
    >
      <Link
        to={`/recipes/${id}`}
        className="w-full grid grid-cols-[120px_repeat(4,1fr)_50px] text-center py-3 items-center pl-28 pr-5"
      >
        {image && (
          <img src={image} alt={name} className="w-8 h-8 mx-auto rounded-lg" />
        )}

        <p>{name}</p>
        <p>{cuisine}</p>
        <p>{difficulty}</p>
        <p>{caloriesPerServing}</p>
        <div className="flex justify-end pr-4">
          <FontAwesomeIcon icon={faGreaterThan} className="text-text" />
        </div>
      </Link>
    </li>
  );
};

export default FoodListItem;
