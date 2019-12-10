import React from 'react';
import { Neighborhood, PriceRange } from '../db/entities';
const EnumContext = React.createContext<{ neighborhoods: Neighborhood[], priceRanges: PriceRange[] }>({
  neighborhoods: [],
  priceRanges: [],
});
export default EnumContext;
