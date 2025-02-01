import React, { useState } from 'react';
import Sidebar from '../components/sideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../components/searchBar';
import Header from '../components/header';
import FoodList from '../components/foodList';
import Pagination from '../components/pagination';

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const limit = 20;
  const skip = (currentPage - 1) * limit;
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex justify-between items-center w-full p-4">
          <div className="flex w-1/12">
            <FontAwesomeIcon
              icon={faBurger}
              className="text-title text-xl pr-2"
            />
            <p className="text-title">Yemek Listesi</p>
          </div>
          <div className="w-2/12 max-w-full">
            <SearchBar />
          </div>
        </div>
        <main className="p-4 flex-1 flex flex-col">
          <div className="grid grid-cols-[120px_repeat(4,1fr)_50px] border-b rounded-full bg-white text-title font-semibold py-2 text-center pl-28 pr-5">
            <h2>YEMEK RESMİ</h2>
            <h2>YEMEK ADI</h2>
            <h2>MUTFAK</h2>
            <h2>ZORLUK</h2>
            <h2>KALORİ</h2>
            <h2>İŞLEM</h2>
          </div>
          <div className="flex-1 overflow-y-auto bg-list mt-2 shadow-lg rounded-xl">
            <FoodList
              currentPage={currentPage}
              limit={limit}
              skip={skip}
              setTotalItems={setTotalItems}
            />
          </div>
        </main>
        <footer className="mt-auto pb-2 flex justify-center pr-2">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </footer>
      </div>
    </div>
  );
};

export default Home;
