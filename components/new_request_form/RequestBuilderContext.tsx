import { createContext, FunctionComponent, useState, SyntheticEvent } from "react"
import { Request } from '../../db/entities'
import { Form } from "../forms"

export interface RequestBuilderContextProps {
  request: Partial<Request>
  updateValue(props: Partial<Request>): void
  saving: boolean
}

export const RequestBuilderContext = createContext<RequestBuilderContextProps>({
  request: {},
  updateValue: (_p) => { throw new Error('not provided') },
  saving: false,
})

export interface RequestBuilderProviderProps extends Omit<RequestBuilderContextProps, 'updateValue' | 'request'> {
  initialRequest: Partial<Request>
  onSubmit(request: Partial<Request>): void
}

export const RequestForm: FunctionComponent<RequestBuilderProviderProps> = ({ children, initialRequest, onSubmit, ...props }) => {
  const [request, setRequest] = useState<Partial<Request>>(initialRequest)
  const updateValue = (props: Partial<Request>) => setRequest({ ...request, ...props })

  function submitHandler(e: SyntheticEvent) {
    e.preventDefault()
    onSubmit(request)
  }

  return (
    <RequestBuilderContext.Provider value={{ updateValue, request, ...props }} >
      <Form onSubmit={submitHandler}>
        {children}
      </Form>
    </RequestBuilderContext.Provider>
  )
}
