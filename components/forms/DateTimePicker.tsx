import { FunctionComponent, InputHTMLAttributes } from "react"
import moment from 'moment'

const FORMAT = 'YYYY-MM-DDTHH:mm'

interface DateTimePickerProps extends Omit<Omit<InputHTMLAttributes<HTMLInputElement>, 'value'>, 'onChange'> {
  label?: string
  value: Date
  onChange: (value: Date) => void
}

function dateToString(date: Date): string {
  return moment(date).format(FORMAT)
}

function stringToDate(dateStr: string): Date {
  return moment(dateStr, FORMAT).toDate()
}

export const DateTimePicker: FunctionComponent<DateTimePickerProps> = ({ label, value, onChange, ...props }) => {
  return (
    <label htmlFor={props.id}>
      {label}
      <input {...props} type='datetime-local' value={dateToString(value)} onChange={e => onChange(stringToDate(e.target.value))} />
    </label>
  )
}
