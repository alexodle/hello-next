import { FieldSet, Select, Option, TextArea } from '../../components/forms'
import { useContext, FunctionComponent, Fragment } from 'react'
import { RequestBuilderContext } from './RequestBuilderContext'
import { EnumContext } from '../EnumContext'
import { Neighborhood, PriceRange } from '../../db/entities'

export interface DetailsFormProps {
}

export const PartySizeSelector: FunctionComponent<{}> = () => {
  const { saving, updateValue, request: { n_people } } = useContext(RequestBuilderContext)
  return (
    <Select
      className='full-line'
      label='Party Size'
      value={n_people!.toString()}
      onChange={e => updateValue({ n_people: parseInt(e.target.value, 10) })}
      disabled={saving}
    >
      <Option value={'2'}>2</Option>
      <Option value={'3'}>3</Option>
      <Option value={'4'}>4</Option>
    </Select>
  )
}

export const NeighborhoodSelector: FunctionComponent<{}> = () => {
  const { saving, updateValue, request: { neighborhood } } = useContext(RequestBuilderContext)
  const { neighborhoods } = useContext(EnumContext)
  return (
    <Select
      className='full-line'
      label='Neighborhood'
      value={neighborhood!.id.toString()}
      onChange={e => updateValue({ neighborhood: { id: parseInt(e.target.value, 10) } as Neighborhood })}
      disabled={saving}
    >
      {neighborhoods.map(n =>
        <Option key={n.id} value={n.id.toString()}>{n.name}</Option>
      )}
    </Select>
  )
}

export const PriceRangeSelector: FunctionComponent<{}> = () => {
  const { saving, updateValue, request: { price_range } } = useContext(RequestBuilderContext)
  const { priceRanges } = useContext(EnumContext)
  return (
    <Select
      className='full-line'
      label='Price range'
      value={price_range!.id.toString()}
      onChange={e => updateValue({ price_range: { id: parseInt(e.target.value, 10) } as PriceRange })}
      disabled={saving}
    >
      {priceRanges.map(pr =>
        <Option key={pr.id} value={pr.id.toString()}>{pr.name}</Option>
      )}
    </Select>
  )
}

export const NotesTextArea: FunctionComponent<{}> = () => {
  const { saving, updateValue, request: { notes } } = useContext(RequestBuilderContext)
  return (
    <TextArea
      className='full-line'
      label='Any other notes for us?'
      value={notes || ''}
      onChange={e => updateValue({ notes: e.target.value })}
      disabled={saving}
    />
  )
}

export const DetailsForm: FunctionComponent<DetailsFormProps> = () => {
  return (
    <Fragment>
      <PartySizeSelector />
      <NeighborhoodSelector />
      <PriceRangeSelector />
      <NotesTextArea />
    </Fragment>
  )
}
