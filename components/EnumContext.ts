import React from 'react';
import { Neighborhood, PriceRange } from '../db/entities';

export const EnumContext = React.createContext<{ neighborhoods: Neighborhood[], priceRanges: PriceRange[] }>({
  neighborhoods: [],
  priceRanges: [],
});
