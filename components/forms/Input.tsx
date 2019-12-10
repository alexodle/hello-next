import { FunctionComponent, InputHTMLAttributes, Fragment } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input: FunctionComponent<InputProps> = ({ label, ...props }) => {
  if (!label) {
    return <input {...props} />
  }
  return (
    <label htmlFor={props.id}>
      {label}
      <input {...props} />
    </label>
  )
}
