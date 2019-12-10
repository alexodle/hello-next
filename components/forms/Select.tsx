import { FunctionComponent, SelectHTMLAttributes, OptionHTMLAttributes } from "react"

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
}

export const Select: FunctionComponent<SelectProps> = ({ children, label, ...props }) => (
  <label htmlFor={props.id}>
    {label}
    <select {...props}>{children}</select>
  </label>
)

export const Option: FunctionComponent<OptionHTMLAttributes<HTMLOptionElement>> = ({ children, ...props }) => (
  <option {...props}>{children}</option>
)
