import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFoodDetail } from '../services/foodService';
import { FoodDetail } from '../types/FoodDetail';
import SideBar from '../components/sideBar';
import Header from '../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';

const FoodDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [food, setFood] = useState<FoodDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('ingredients');

  useEffect(() => {
    const fetchFoodDetail = async () => {
      if (!id) return;
      try {
        const data = await getFoodDetail(id);
        setFood(data);
      } catch (err) {
        setError('Yemek detayları alınırken hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodDetail();
  }, [id]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;
  if (!food) return <div>Yemek bulunamadı.</div>;

  const InfoCard = ({
    title,
    content,
  }: {
    title: string;
    content: string | string[];
  }) => (
    <div className="flex items-center gap-2 bg-list p-1 rounded-md border border-text">
      <FontAwesomeIcon
        className="bg-blue-200 p-4 rounded-xl text-blue-600"
        icon={faInfo}
      />
      <div>
        <h3 className="text-xs font-semibold text-text">{title}</h3>
        <p>{Array.isArray(content) ? content.join(', ') : content}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-row h-screen overflow-hidden bg-background">
      <div className="flex">
        <SideBar />
      </div>
      <div className="w-full flex flex-col">
        <Header />
        <div className="flex w-1/12 mb-2">
          <FontAwesomeIcon icon={faInfo} className="text-title text-xl pr-2" />
          <p className="text-title">Yemek Listesi</p>
        </div>
        <div className="flex h-[100vh]  gap-4 mb-10">
          {/* Sol Bölüm */}
          <div className="w-1/3 p-4 rounded-lg bg-detail shadow-md border border-text h-full flex flex-col">
            {/* Yemek Görseli ve Adı */}
            <div className="flex items-center gap-4 mb-4 px-4">
              <img
                src={food.image}
                alt="yemek resmi"
                className="w-20 h-24 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold">{food.name}</h2>
            </div>

            {/* Bilgi Kartları */}
            <div className="space-y-6 p-4">
              {' '}
              {/* Gruplar arası boşluk için space-y-6 */}
              {/* 1. Grup */}
              <div className="space-y-3">
                {' '}
                {/* Kartlar arası boşluk için space-y-3 */}
                <InfoCard title="YEMEK ADI" content={food.name} />
                <InfoCard title="MUTFAK" content={food.cuisine} />
                <InfoCard
                  title="KALORİ"
                  content={`${food.caloriesPerServing} kcal`}
                />
                <InfoCard
                  title="HAZIRLANMA SÜRESİ"
                  content={`${food.prepTimeMinutes} dk`}
                />
              </div>
              {/* 2. Grup */}
              <div className="space-y-3">
                <InfoCard
                  title="PİŞME SÜRESİ"
                  content={`${food.cookTimeMinutes} dk`}
                />
                <InfoCard
                  title="ETİKETLER"
                  content={
                    Array.isArray(food.tags) ? food.tags.join(', ') : food.tags
                  }
                />
              </div>
              {/* 3. Grup */}
              <div className="space-y-3">
                <InfoCard
                  title="YEMEK TÜRÜ"
                  content={
                    Array.isArray(food.mealType)
                      ? food.mealType.join(', ')
                      : food.mealType
                  }
                />
                <InfoCard title="ZORLUK" content={food.difficulty} />
              </div>
            </div>
          </div>

          {/* Sağ Bölüm */}
          <div className="w-2/3 p-1 rounded-lg  h-full flex flex-col space-y-4">
            {/* Başlıklar */}
            <div className="flex space-x-4 bg-[#faf0eb] p-1 rounded-full border border-text">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`px-4 py-2 rounded-full font-semibold ${
                  activeTab === 'ingredients'
                    ? 'bg-title text-white'
                    : 'bg-[#faf0eb] text-text'
                }`}
              >
                <FontAwesomeIcon icon={faLeaf} />
                İçindekiler
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={`px-4 py-2 rounded-full font-semibold ${
                  activeTab === 'instructions'
                    ? 'bg-title text-white'
                    : 'bg-[#faf0eb] text-text'
                }`}
              >
                <FontAwesomeIcon icon={faLeaf} />
                Yemek Tarifi
              </button>
            </div>

            {/* İçerik Kutusu */}
            <div className="p-4 border border-text bg-detail rounded-3xl shadow-inner h-full overflow-y-auto">
              {activeTab === 'ingredients' ? (
                <div className="border border-text rounded-xl p-2 bg-list">
                  <h3 className="text-text font-semibold text-sm mb-1">
                    .İÇİNDEKİLER
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {food.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="border border-text rounded-xl p-2 bg-list">
                  <h3 className="text-text font-semibold text-sm mb-1">
                    .YEMEK TARİFİ
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {food.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;
