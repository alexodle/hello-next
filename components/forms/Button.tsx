import { FunctionComponent, SyntheticEvent } from "react"
import { Button as MaterialButton } from '@material-ui/core'

export interface ButtonProps {
  disabled?: boolean
  onClick?(ev: SyntheticEvent): void
}

export const Button: FunctionComponent<ButtonProps> = ({ children, ...props }) => (
  <MaterialButton {...props} variant='outlined'>{children}</MaterialButton>
)

export const SubmitButton: FunctionComponent<ButtonProps> = ({ children, ...props }) => (
  <MaterialButton {...props} variant='contained' color='primary' type='submit'>{children}</MaterialButton>
)
