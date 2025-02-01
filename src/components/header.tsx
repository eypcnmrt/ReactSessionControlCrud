import UserProfile from './userProfile';

const Header = () => {
  return (
    <header className="h-[80px] w-full justify-between items-center p-4 bg-background">
      <div className="relative flex items-center w-full">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-title text-xl font-bold">
          TCDD YEMEK TARİFLERİ
        </h1>
        <div className="ml-auto">
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
