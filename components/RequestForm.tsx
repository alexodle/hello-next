import { useContext, useState, SyntheticEvent } from 'react'
import { EnumContext } from './EnumContext'
import { Form, Input, TextArea, Select, Option, Button, SubmitButton, FieldSet, DateTimePicker } from './forms'
import { Request, Neighborhood, PriceRange, Contact } from '../db/entities'

const MAX_CONTACTS = 4;

function addHours(d: Date, h: number): Date {
  const d2 = new Date(d)
  d2.setHours(d2.getHours() + h)
  return d2
}

function hoursBetween(d1: Date, d2: Date): number {
  return Math.abs(d1.getTime() - d2.getTime()) / 36e5;
}

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
  const [startTime, setStartTime] = useState(new Date(request.start_window as Date))
  const [hours, setHours] = useState(hoursBetween(startTime, new Date(request.end_window as Date)).toString())

  function onSubmit(e: SyntheticEvent) {
    e.preventDefault()
    props.onSubmit({
      n_people: parseInt(partySize, 10),
      notes,
      neighborhood: { id: parseInt(neighborhoodId) } as Neighborhood,
      price_range: { id: parseInt(priceRangeId) } as PriceRange,
      start_window: startTime,
      end_window: addHours(startTime, parseInt(hours, 10)),
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
    <Form className='request-form'>
      <FieldSet legend='Date window'>
        <DateTimePicker className='start-time-picker' label='Start Time' name='startTime' value={startTime} onChange={setStartTime} disabled={isPosting} />
        <Select label='Hours' name='hours' value={hours} onChange={e => setHours(e.target.value)} disabled={isPosting}>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
          <Option value={4}>4</Option>
          <Option value={5}>5</Option>
          <Option value={6}>6</Option>
        </Select>
      </FieldSet>
      <Select label='Party Size' name='partySize' value={partySize} onChange={e => setPartySize(e.target.value)} disabled={isPosting}>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
        <Option value={4}>4</Option>
      </Select>
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
          <Input
            key={i}
            type='tel'
            label={`Phone ${i + 1}`}
            maxLength={13}
            className='phone-number'
            name={`contact${i}`}
            value={c}
            onChange={e => updateContactAt(e.target.value, i)}
            placeholder='123-456-7899'
            disabled={isPosting}
          />
        )}
      </FieldSet>
      <TextArea id='notes-input' name='notes' label='Notes' value={notes} onChange={e => setNotes(e.target.value)} disabled={isPosting} />
      {props.onCancel ? <Button type='button' onClick={props.onCancel} disabled={isPosting}>Cancel</Button> : null}
      <SubmitButton onClick={onSubmit} disabled={isPosting}>Save</SubmitButton>
    </Form>
  )
}