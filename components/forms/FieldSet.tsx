import { FunctionComponent, InputHTMLAttributes, Fragment, FieldsetHTMLAttributes } from "react"

export interface FieldSetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: string
}

export const FieldSet: FunctionComponent<FieldSetProps> = ({ children, legend, ...props }) => {
  return (
    <fieldset {...props}>
      {legend ? <legend>{legend}</legend> : null}
      {children}
    </fieldset>
  )
}
