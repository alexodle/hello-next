import { FunctionComponent, useContext, useState, SyntheticEvent } from "react"
import { RequestBuilderContext } from "./RequestBuilderContext"
import { DateForm } from './DateForm'
import { DetailsForm } from './DetailsForm'
import { Form, SubmitButton, Button } from "../forms"

const ORDER = [
  DateForm,
  DetailsForm
]

export interface RequestBuilderProps {
  forceExpand?: boolean
  saveButtonText?: string
}

export const RequestBuilder: FunctionComponent<RequestBuilderProps> = ({ forceExpand, saveButtonText }) => {
  const { onSave, showHeaders, saving, request } = useContext(RequestBuilderContext)
  const [formIndex, setFormIndex] = useState(forceExpand ? ORDER.length - 1 : 0)

  function onSubmit(e: SyntheticEvent) {
    e.preventDefault()
    onSave(request)
  }

  saveButtonText = saveButtonText || "Let's make a date"
  return (
    <Form>
      {ORDER.slice(0, formIndex + 1).map((C, i) => (
        <C key={i} />
      ))}
      {formIndex < ORDER.length - 1 ? <Button onClick={() => setFormIndex(formIndex + 1)} disabled={saving}>Next</Button> : null}
      {formIndex === ORDER.length - 1 ?
        <SubmitButton onClick={onSubmit} disabled={saving}>{saveButtonText}</SubmitButton> :
        null}
    </Form>
  )
}
