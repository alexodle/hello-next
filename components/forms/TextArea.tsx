import { FunctionComponent } from "react"
import { TextField } from "@material-ui/core"

export interface TextAreaProps {
  className?: string
  label?: string
  disabled?: boolean
  rows?: number
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

export const TextArea: FunctionComponent<TextAreaProps> = ({ children, className, rows, ...props }) => (
  <TextField {...props} multiline rows={rows || 3} rowsMax={rows || 3} fullWidth={!!(className && className.includes('full-line'))} />
)
