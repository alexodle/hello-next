import moment from 'moment'
import { useState, useContext, FunctionComponent, Fragment } from 'react'
import { RequestBuilderContext } from './RequestBuilderContext'
import { FieldSet, DatePicker, TimePicker, Select, Option, EditableSuggestion, InlineInputSeparator } from '../forms';
import { hoursBetween } from '../../common/date_utils'

export interface DateFormProps {
}

export const DateForm: FunctionComponent<DateFormProps> = () => {
  const [isEditing, setIsEditing] = useState(false)

  const { updateValue, saving, request: { start_window, end_window } } = useContext(RequestBuilderContext)
  const startDate = new Date(start_window as Date)
  const endDate = new Date(end_window as Date)
  const hours = hoursBetween(endDate, startDate).toString()

  function updateStartWindow(d: Date) {
    updateValue({
      start_window: d,
      end_window: moment(d).add(hours, 'hours').toDate(),
    })
  }

  function updateStartDate(d: Date) {
    updateStartWindow(moment(startDate).set('date', d.getDate()).set('month', d.getMonth()).toDate())
  }

  function updateStartTime(d: Date) {
    updateStartWindow(moment(startDate).set('hours', d.getHours()).set('minute', d.getMinutes()).toDate())
  }

  function updateHours(h: string) {
    updateValue({ end_window: moment(startDate).add(parseInt(h, 10), 'hours').toDate() })
  }

  function renderEditor() {
    return (
      <Fragment>
        <DatePicker
          name='startDate'
          value={new Date(start_window as Date)}
          onChange={updateStartDate}
          min={moment().add(1, 'day').toDate()}
          format='dddd, MMMM Do'
          disabled={saving}
        />
        <InlineInputSeparator>at</InlineInputSeparator>
        <TimePicker
          name='start'
          value={startDate}
          onChange={updateStartTime}
          minutesStep={30}
          format='h:mma'
          disabled={saving}
        />
        <InlineInputSeparator>for</InlineInputSeparator>
        <Select
          value={hours}
          onChange={e => updateHours(e.target.value as string)}
          disabled={saving}
        >
          {['2', '3', '4', '5'].map(v => (
            <Option key={v} value={v}>{v}</Option>
          ))}
        </Select>
        <InlineInputSeparator>hours</InlineInputSeparator>
      </Fragment>
    )
  }

  return isEditing ?
    renderEditor() :
    <EditableSuggestion onEdit={() => setIsEditing(true)}>{moment(startDate).calendar()} - {hours} hours</EditableSuggestion>
}
