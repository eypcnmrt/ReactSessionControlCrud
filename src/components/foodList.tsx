/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react';
import { useSearch } from '../context/useSearch';
import { getFoodList, searchFoodList } from '../services/foodService';
import FoodListItem from './foodListItem';
import { Food } from '../types/Food';

interface FoodListProps {
  currentPage: number;
  limit: number;
  skip: number;
  setTotalItems: (total: number) => void;
}

const FoodList: React.FC<FoodListProps> = ({
  currentPage,
  limit,
  skip,
  setTotalItems,
}) => {
  const { searchTerm } = useSearch();
  const [foodList, setFoodList] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        if (searchTerm.trim() === '') {
          const data = await getFoodList(limit, skip);
          setFoodList(data.recipes);
          setTotalItems(data.total);
        } else {
          const data = await searchFoodList(searchTerm);
          setFoodList(data.recipes);
          setTotalItems(data.total);
        }
        setLoading(false);
      } catch (error) {
        setError('Yemek listesi alınırken hata oluştu.');
        setLoading(false);
      }
    };

    fetchFoodList();
  }, [searchTerm, limit, skip, currentPage, setTotalItems]);

  if (loading) return <div>Yemekler yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul className="max-h-[600px] overflow-y-scroll scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-orange-100 mt-2">
      {foodList.map((food, index) => (
        <FoodListItem
          index={index}
          key={food.id}
          id={food.id}
          image={food.image}
          name={food.name}
          cuisine={food.cuisine}
          difficulty={food.difficulty}
          caloriesPerServing={food.caloriesPerServing}
        />
      ))}
    </ul>
  );
};

export default FoodList;
