import { FunctionComponent, FormHTMLAttributes } from "react"

export const Form: FunctionComponent<FormHTMLAttributes<HTMLFormElement>> = ({ children, ...props }) => (
  <form {...props} className={`datenight-form ${props.className ? props.className : ''}`}>{children}</form>
)
