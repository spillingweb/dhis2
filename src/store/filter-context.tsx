import { createContext, useState } from "react";

export type FilterContextType = {
    filtered: string,
    onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void    
}

export const FilterContext = createContext<FilterContextType | null>(null);

const FilterContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [filtered, setFiltered] = useState<string>("ALL TYPES");

  function onFilter (e: React.ChangeEvent<HTMLSelectElement>) {
    setFiltered(e.target.value);
  }

  return (
    <FilterContext.Provider value={{filtered, onFilter}}>
        {children}
    </FilterContext.Provider>
  )
}

export default FilterContextProvider;