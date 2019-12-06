import { Request } from '../db/entities/Request'
import moment from 'moment'

export interface RequestProps {
  request: Request
}

export default function RequestView(props: RequestProps) {
  const { request } = props
  return (
    <section className='request'>
      <h2>Request: {request.id}</h2>
      <dl>
        <dt>Owner</dt><dd>{request.owner.display_name}</dd>
        <dt>Party Size</dt><dd>{request.n_people}</dd>
        <dt>Price Range</dt><dd>{request.price_range.name}</dd>
        <dt>Neighborhood</dt><dd>{request.neighborhood.name}</dd>
        <dt>Start Window</dt><dd>{moment(request.start_window).calendar()}</dd>
        <dt>End Window</dt><dd>{moment(request.end_window).calendar()}</dd>
        <dt>Contacts</dt><dd>{request.contacts.length ?
          request.contacts.map(c => c.phone_number).join(', ') :
          'None'}</dd>
      </dl>
    </section>
  )
}
