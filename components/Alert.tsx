import { createContext, FunctionComponent, useState } from "react"
import { makeStyles } from '@material-ui/core/styles'

const DEFAULT_TIMEOUT_MS = 5000

const useStyles = makeStyles({
  root: {
    position: 'relative',
    'padding-left': '1em',
    'margin': '2em',
    'border-radius': '5px',
    border: '1px solid transparent',
  },
  success: {
    'background-color': '#d4edda',
    'border-color': '#c3e6cb',
    color: '#155724',
  },
  info: {
    'background-color': '#e2e3e5',
    'border-color': '#d6d8db',
    color: '#383d41',
  },
  error: {
    'background-color': '#f8d7da',
    'border-color': '#f5c6cb',
    color: '#721c24',
  },
})

interface AlertInfo {
  message: string
  status: AlertStatus
  timeoutId: NodeJS.Timeout
}

export type AlertStatus = 'success' | 'info' | 'error'

export interface AlertContextProps {
  alert(message: string, status: AlertStatus): void
}

export const AlertContext = createContext<AlertContextProps>({
  alert: (_message: string, _status: AlertStatus) => {
    throw new Error('alert not applied')
  }
})

export const Alert: FunctionComponent<{}> = ({ children }) => {
  const [alert, setAlert] = useState<AlertInfo | null>(null)
  const classes = useStyles()

  function onAlert(message: string, status: AlertStatus) {
    if (alert) {
      clearTimeout(alert.timeoutId)
      setAlert(null)
    }
    const timeoutId = setTimeout(() => setAlert(null), DEFAULT_TIMEOUT_MS)
    setAlert({ message, status, timeoutId })
  }

  const renderAlert = () => (
    !alert ? null :
      <div className={`${classes.root} ${classes[alert.status]}`}>
        <p>{alert.message}</p>
      </div>
  )

  return (
    <AlertContext.Provider value={{ alert: onAlert }}>
      {renderAlert()}
      {children}
    </AlertContext.Provider >
  )
}
