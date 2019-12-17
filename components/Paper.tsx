import { FunctionComponent, SyntheticEvent } from "react"
import { Paper as MaterialPaper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: '1.5em',
  },
})

export interface PaperProps {
  className?: string
}

export const Paper: FunctionComponent<PaperProps> = ({ children, className, ...props }) => {
  const classes = useStyles()
  return (
    <MaterialPaper {...props} className={`${classes.root} ${className || ''}`}>
      {children}
    </MaterialPaper>
  );
}
