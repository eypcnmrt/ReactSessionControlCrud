import { useContext } from 'react';
import { SearchContext, SearchContextProps } from './SearchContext';

export const useSearch = (): SearchContextProps => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
