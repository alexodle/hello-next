import { FunctionComponent } from "react"
import { DatePicker as MaterialDatePicker, TimePicker as MaterialTimePicker } from "@material-ui/pickers"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  datePicker: {
    width: '15em',
  },
  timePicker: {
    width: '10em',
  }
})

export interface DatePickerProps {
  className?: string
  name?: string
  disabled?: boolean
  label?: string
  value: Date
  min?: Date
  max?: Date
  format?: string
  onChange: (value: Date) => void
}

export interface TimePickerProps {
  className?: string
  name?: string
  disabled?: boolean
  label?: string
  value: Date
  format?: string
  minutesStep?: number
  onChange: (value: Date) => void
}

export const DatePicker: FunctionComponent<DatePickerProps> = ({ name, label, value, min, max, onChange, className, format }) => {
  const classes = useStyles()
  return (
    <MaterialDatePicker
      name={name}
      label={label}
      value={value}
      onChange={d => onChange(d!.toDate())}
      minDate={min}
      maxDate={max}
      format={format}
      className={`${classes.datePicker} ${className || ''}`}
    />
  )
}

export const TimePicker: FunctionComponent<TimePickerProps> = ({ name, label, value, minutesStep, onChange, className, format }) => {
  const classes = useStyles()
  return (
    <MaterialTimePicker
      name={name}
      label={label}
      value={value}
      onChange={d => onChange(d!.toDate())}
      minutesStep={minutesStep}
      format={format}
      className={`${classes.timePicker} ${className || ''}`}
    />
  )
}
