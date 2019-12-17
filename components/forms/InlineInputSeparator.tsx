import { FunctionComponent } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    'margin-left': '1em',
    'margin-right': '1em',
  }
})

export interface InlineInputSeparatorProps {
  className?: string
}

export const InlineInputSeparator: FunctionComponent<InlineInputSeparatorProps> = ({ children, className }) => {
  const classes = useStyles()
  return (
    <p className={`${classes.root} ${className || ''}`}>{children}</p>
  )
}
