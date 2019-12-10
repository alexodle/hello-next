import { useContext, useState, SyntheticEvent } from 'react'
import EnumContext from './EnumContext'
import { Form, Input, TextArea, Select, Option, Button, SubmitButton, FieldSet } from './forms'
import { Request, Neighborhood, PriceRange, Contact } from '../db/entities'

const MAX_CONTACTS = 4;

export interface RequestFormProps {
  request: Partial<Request>
  isPosting?: boolean;
  onSubmit: (request: Partial<Request>) => void;
  onCancel?: () => void;
}

export function RequestForm(props: RequestFormProps) {
  const { request, isPosting } = props;
  const { neighborhoods, priceRanges } = useContext(EnumContext)

  const [partySize, setPartySize] = useState(request.n_people!.toString())
  const [notes, setNotes] = useState(request.notes)
  const [neighborhoodId, setNeighborhoodId] = useState(request.neighborhood!.id.toString())
  const [priceRangeId, setPriceRangeId] = useState(request.price_range!.id.toString())
  const [contacts, setContacts] = useState(request.contacts!.map(c => c.phone_number))

  // TODO
  const [startTime, setStartTime] = useState(request.start_window)
  const [endTime, setEndTime] = useState(request.end_window)

  function onSubmit(e: SyntheticEvent) {
    e.preventDefault()
    props.onSubmit({
      n_people: parseInt(partySize, 10),
      notes,
      neighborhood: { id: parseInt(neighborhoodId) } as Neighborhood,
      price_range: { id: parseInt(priceRangeId) } as PriceRange,
      start_window: startTime,
      end_window: endTime,
      contacts: contacts.map(phone => ({ phone_number: phone } as Contact)),
    })
  }

  function updateContactAt(value: string, i: number) {
    const newContacts = contacts.slice()
    if (value.length) {
      if (i === contacts.length) {
        newContacts.push(value)
      } else {
        newContacts[i] = value
      }
    } else {
      newContacts.splice(i, 1)
    }
    setContacts(newContacts)
  }

  return (
    <Form>
      <Input label="Party Size" name='n_people' value={partySize} onChange={e => setPartySize(e.target.value)} disabled={isPosting} />
      <TextArea id='notes-input' name='notes' label='Notes' value={notes} onChange={e => setNotes(e.target.value)} disabled={isPosting} />
      <Select id='neighborhood-select' name='neighborhood_id' label='Neighborhood' value={neighborhoodId} onChange={e => setNeighborhoodId(e.target.value)} disabled={isPosting}>
        {neighborhoods.map(n => (
          <Option key={n.id} value={n.id}>{n.name}</Option>
        ))}
      </Select>
      <Select id='price-range-select' name='price_range_id' label='Price Range' value={priceRangeId} onChange={e => setPriceRangeId(e.target.value)} disabled={isPosting}>
        {priceRanges.map(pr => (
          <Option key={pr.id} value={pr.id}>{pr.name}</Option>
        ))}
      </Select>
      <FieldSet legend={"Contact Phone Numbers"}>
        {contacts.concat([""]).slice(0, MAX_CONTACTS).map((c, i) =>
          <Input key={i} name={`contact${i}`} value={c} onChange={e => updateContactAt(e.target.value, i)} disabled={isPosting} />
        )}
      </FieldSet>
      {props.onCancel ? <Button type='button' onClick={props.onCancel} disabled={isPosting}>Cancel</Button> : null}
      <SubmitButton onClick={onSubmit} disabled={isPosting}>Submit</SubmitButton>
    </Form>
  )
}