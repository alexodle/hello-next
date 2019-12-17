import { createContext, FunctionComponent, useState } from "react"
import { Request } from '../../db/entities'

export interface RequestBuilderContextProps {
  request: Partial<Request>
  updateValue(props: Partial<Request>): void
  onSave(request: Partial<Request>): void
  showHeaders?: boolean
  saving: boolean
}

export const RequestBuilderContext = createContext<RequestBuilderContextProps>({
  request: {},
  updateValue: (_p) => { throw new Error('not provided') },
  onSave: (_r) => { throw new Error('not provided') },
  showHeaders: true,
  saving: false,
})

export interface RequestBuilderProviderProps extends Omit<RequestBuilderContextProps, 'updateValue' | 'request'> {
  initialRequest: Partial<Request>
}

export const RequestBuilderProvider: FunctionComponent<RequestBuilderProviderProps> = ({ children, initialRequest, ...props }) => {
  const [request, setRequest] = useState<Partial<Request>>(initialRequest)
  const updateValue = (props: Partial<Request>) => setRequest({ ...request, ...props })
  return (
    <RequestBuilderContext.Provider value={{ updateValue, request, ...props }} >
      {children}
    </RequestBuilderContext.Provider>
  )
}
