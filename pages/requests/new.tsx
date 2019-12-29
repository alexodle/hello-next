import moment from 'moment'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { FunctionComponent, useContext, useState } from 'react'
import { fetchJSON, postJSON } from '../../common/fetch'
import { AlertContext } from '../../components/Alert'
import { EnumContext } from '../../components/EnumContext'
import { Button, FieldSet, SubmitButton } from '../../components/forms'
import { DateForm } from '../../components/new_request_form/DateForm'
import { DetailsForm } from '../../components/new_request_form/DetailsForm'
import { RequestForm } from '../../components/new_request_form/RequestBuilderContext'
import { Contact, Request } from '../../db/entities'
import { EnumsResponse } from '../api/enums'

const ORDER: [string, FunctionComponent][] = [
  ['When would you like to go out?', DateForm],
  ['Great, we just need a few more details', DetailsForm]
]

const FRIDAY = 5
const SATURDAY = 6

function thisFriday() {
  const time = moment().hour(19).minute(0).second(0).millisecond(0)
  const currDay = moment().day()
  if (currDay < FRIDAY) {
    return time.day(FRIDAY)
  } else if (currDay === FRIDAY) {
    return time.day(SATURDAY)
  }
  return time.day(FRIDAY - currDay)
}

export interface NewRequestPageProps {
  enums: EnumsResponse
}

const NewRequestPage: NextPage<NewRequestPageProps> = ({ enums }) => {
  const alerter = useContext(AlertContext)

  const [formIndex, setFormIndex] = useState(0)
  const [saving, setSaving] = useState(false)

  const router = useRouter()
  async function onSave(request: Partial<Request>) {
    setSaving(true)
    try {
      const resp = await postJSON<Partial<Request>>(`/api/requests`, request)
      router.push(`/requests/${resp.data.id}?alert_message=Success!&alert_status=success`)
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.log(e)
      }
      alerter.alert('Unknown error occurred. Please try again.', 'error')
      setSaving(false)
    }
  }

  const initialRequest = {
    start_window: thisFriday().toDate(),
    end_window: thisFriday().add(4, 'hours').toDate(),
    neighborhood: enums.neighborhoods[0],
    price_range: enums.priceRanges[1],
    n_people: 2,

    // TODO - auto-populate current user's phone
    contacts: [{ phone_number: '2066602445' } as Contact],
  }

  return (
    <EnumContext.Provider value={enums}>
      <RequestForm initialRequest={initialRequest} onSubmit={onSave} saving={saving}>
        <h2>Let us make a date for you</h2>
        {ORDER.slice(0, formIndex + 1).map(([legend, C], i) => (
          <FieldSet key={i} legend={legend}>
            <C />
          </FieldSet>
        ))}
        {formIndex < ORDER.length - 1 ? <Button onClick={() => setFormIndex(formIndex + 1)} disabled={saving}>Next</Button> : null}
        {formIndex === ORDER.length - 1 ?
          <SubmitButton disabled={saving}>Let's make a date</SubmitButton> :
          null}
      </RequestForm>
    </EnumContext.Provider >
  )
}

NewRequestPage.getInitialProps = async function (_req: NextPageContext) {
  const res = await fetchJSON<EnumsResponse>(`/api/enums`)
  return { enums: res.data }
}

export default NewRequestPage
