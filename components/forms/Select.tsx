import { FunctionComponent } from "react"
import { TextField, MenuItem } from '@material-ui/core';

export interface SelectProps {
  className?: string
  label?: string
  name?: string
  disabled?: boolean
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

export interface OptionProps {
  value: string
}

export const Select: FunctionComponent<SelectProps> = ({ children, className, ...props }) => (
  <TextField
    {...props}
    select
    className={`input ${className || ''}`}
    fullWidth={!!(className && className.includes('full-line'))}
  >{children}</TextField>
)

export const Option: FunctionComponent<OptionProps> = ({ children, ...props }) => (
  <MenuItem {...props}>{children}</MenuItem>
)
