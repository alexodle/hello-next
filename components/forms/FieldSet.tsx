import { FunctionComponent, FieldsetHTMLAttributes } from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    border: 0,
    margin: 0,
    padding: 0,
    'margin-bottom': '1em',
    '& legend': {
      'margin-bottom': '1em',
      'font-weight': 'bold',
    }
  }
})

export interface FieldSetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: string
}

export const FieldSet: FunctionComponent<FieldSetProps> = ({ children, legend, className, ...props }) => {
  const classes = useStyles()
  return (
    <fieldset {...props} className={`${classes.root} ${className || ''}`} >
      {legend ? <legend>{legend}</legend> : null}
      {children}
    </fieldset>
  )
}
