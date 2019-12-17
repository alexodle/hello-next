import { EnumContext } from '../../components/EnumContext'
import { NextPageContext, NextPage } from 'next'
import { EnumsResponse } from '../api/enums'
import { fetchJSON, postJSON } from '../../common/fetch'
import { RequestBuilder } from '../../components/new_request_form/RequestBuilder'
import { Request, Contact } from '../../db/entities'
import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import moment from 'moment'
import { RequestBuilderProvider } from '../../components/new_request_form/RequestBuilderContext'

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
  const [saving, setSaving] = useState(false)

  const router = useRouter()
  async function onSave(request: Partial<Request>) {
    setSaving(true)
    try {
      const resp = await postJSON<Partial<Request>>(`/api/requests`, request)
      router.push(`/requests/${resp.data.id}`)
    } catch (e) {
      // TODO
      console.error('TODO: ' + e)
    } finally {
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
      <RequestBuilderProvider initialRequest={initialRequest} onSave={onSave} saving={saving} showHeaders>
        <h2>Let us make a date for you</h2>
        <RequestBuilder />
      </RequestBuilderProvider>
    </EnumContext.Provider>
  )
}

NewRequestPage.getInitialProps = async function (_req: NextPageContext) {
  const res = await fetchJSON<EnumsResponse>(`/api/enums`)
  return { enums: res.data }
}

export default NewRequestPage
