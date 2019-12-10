import { FunctionComponent, ButtonHTMLAttributes } from "react"

export const Button: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
)
