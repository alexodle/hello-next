import { FunctionComponent, TextareaHTMLAttributes } from "react"

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export const TextArea: FunctionComponent<TextAreaProps> = ({ children, label, ...props }) => (
  <label htmlFor={props.id}>
    {label}
    <textarea rows={3} {...props}>{children}</textarea>
  </label>
)
