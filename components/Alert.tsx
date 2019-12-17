import { createContext, FunctionComponent, useState } from "react"
import { makeStyles } from '@material-ui/core/styles'

const DEFAULT_TIMEOUT_MS = 5000

const useStyles = makeStyles({
  root: {

  }
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

  function hide() {
    if (alert) {
      clearTimeout(alert.timeoutId)
      setAlert(null)
    }
  }

  function onAlert(message: string, status: AlertStatus) {
    hide()
    const timeoutId = setTimeout(() => setAlert(null), DEFAULT_TIMEOUT_MS)
    setAlert({ message, status, timeoutId })
  }

  const renderAlert = () => (
    !alert ? null :
      <div className={`datenight-alert ${alert.status}`}>
        <p>{alert.message}</p>
        <span className='close-button' onClick={hide}>X</span>
      </div>
  )

  return (
    <AlertContext.Provider value={{ alert: onAlert }}>
      {renderAlert()}
      {children}
    </AlertContext.Provider >
  )
}
