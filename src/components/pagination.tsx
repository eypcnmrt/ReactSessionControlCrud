const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const pageNumbers = () => {
    const range = 2;
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - range);
      const endPage = Math.min(totalPages, currentPage + range);

      if (startPage > 1) pages.push(1);
      if (startPage > 2) pages.push('...');

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) pages.push('...');
      if (endPage < totalPages) pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between w-full">
      <p className="text-sm text-text pl-4">Toplam 20 sonuç gösteriliyor</p>

      <div className="flex items-center gap-2 rounded-full shadow-md bg-list py-2">
        <button
          onClick={() => goToPage(1)}
          className="px-3 py-2 rounded-full text-sm disabled:opacity-50"
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="px-3 py-2 rounded-full text-sm disabled:opacity-50"
          disabled={currentPage === 1}
        >
          ‹
        </button>

        {pageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof page === 'number') goToPage(page);
            }}
            className={`px-3 py-2 rounded-full text-sm ${
              page === currentPage
                ? 'bg-orange-500 text-white'
                : 'bg-transparent hover:bg-gray-300'
            }`}
            disabled={typeof page === 'string'}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          className="px-3 py-2 rounded-full text-sm disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          ›
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          className="px-3 py-2 rounded-full text-sm disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
