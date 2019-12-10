import { FunctionComponent, InputHTMLAttributes, ButtonHTMLAttributes } from "react"

export const SubmitButton: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props} type='submit'>{children}</button>
)
