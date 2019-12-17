import { FunctionComponent } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: '0.5em',
    'border-radius': '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
  }
})

export interface EditableSuggestionProps {
  className?: string
  onEdit(): void
}

export const EditableSuggestion: FunctionComponent<EditableSuggestionProps> = ({ onEdit, children, className }) => {
  const classes = useStyles()
  return (
    <p className={`${classes.root} ${className || ''}`} onClick={() => onEdit()}>{children}</p>
  )
}
