import { EnumsResponse } from '../../pages/api/enums'
import { Neighborhood, PriceRange } from '../../db/entities'
import { fetchJSON } from '../fetch'


export async function fetchEnums(): Promise<{ neighborhoods: Neighborhood[], priceRanges: PriceRange[] }> {
  const { data: { neighborhoods, priceRanges } } = await fetchJSON<EnumsResponse>(`/api/enums`)
  return { neighborhoods, priceRanges }
}
