import Layout from '../../components/Layout'
import { Request, Neighborhood, PriceRange } from '../../db/entities'
import EnumContext from '../../components/EnumContext'
import { RequestForm } from '../../components/RequestForm'
import moment from 'moment'
import { NextPageContext } from 'next'
import { EnumsResponse } from '../api/enums'
import { fetchJSON } from '../../common/fetch'

const FRIDAY = 5

function thisFriday() {
  const now = moment()
  const currDay = moment().day()
  if (currDay < FRIDAY) {
    return now.day(FRIDAY)
  } else if (currDay === FRIDAY) {
    return now.day(7)
  }
  return now.day(FRIDAY - currDay)
}

export interface NewRequestPageProps {
  enums: EnumsResponse
}

export default function NewRequestPage(props: NewRequestPageProps) {
  const { enums } = props;

  function onSubmit(request: Partial<Request>) {
    console.log('would submit: ' + JSON.stringify(request))
  }

  return (
    <EnumContext.Provider value={enums}>
      <Layout>
        <RequestForm
          onSubmit={onSubmit}
          request={{
            n_people: 2,
            start_window: thisFriday().hour(19).minute(0).toDate(),
            end_window: thisFriday().hour(22).minute(30).toDate(),
            notes: '',
            neighborhood: { id: enums.neighborhoods[0].id } as Neighborhood,
            price_range: { id: enums.priceRanges[0].id } as PriceRange,
            contacts: [],
          }}
        />
      </Layout>
    </EnumContext.Provider>
  )
}

NewRequestPage.getInitialProps = async function (_req: NextPageContext) {
  const res = await fetchJSON<EnumsResponse>(`/api/enums`)
  return { enums: res.data }
}
