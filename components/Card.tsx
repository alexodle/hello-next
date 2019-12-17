import { FunctionComponent } from "react"
import { Card as MaterialCard } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    'margin-top': '2em',
    'margin-bottom': '2em',
    width: '100%',
  },
})

export interface CardProps {
  className?: string
}

export const Card: FunctionComponent<CardProps> = ({ children, className, ...props }) => {
  const classes = useStyles()
  return (
    <MaterialCard {...props} className={`${classes.root} ${className || ''}`}>
      {children}
    </MaterialCard>
  );
}
