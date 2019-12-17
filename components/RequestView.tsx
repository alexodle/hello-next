import { Request } from '../db/entities/Request'
import moment from 'moment'
import { FunctionComponent, useState } from 'react'
import { Neighborhood } from '../db/entities'
import { makeStyles } from '@material-ui/core/styles'
import { CardMedia, CardContent, CardHeader } from '@material-ui/core'
import { Card } from './Card'
import { hoursBetween } from '../common/date_utils'
import { RequestBuilderContext } from './new_request_form/RequestBuilderContext'
import { DateForm } from './new_request_form/DateForm'
import { PartySizeSelector, PriceRangeSelector, NeighborhoodSelector, NotesTextArea } from './new_request_form/DetailsForm'
import { Form } from './forms'
import { RequestBuilder } from './new_request_form/RequestBuilder'

const useStyles = makeStyles({
  card: {
    maxWidth: '550px',
  },
  media: {
    width: '550px',
    height: '200px',
  },
  dlgrid: {
    display: 'grid',
    'grid-template-columns': '6em auto',
  }
})

function findBackgroundImage(neighborhood: Neighborhood): string | null {
  if (!neighborhood.images) return null
  const img = neighborhood.images.images.find(img => img.type === 'fullscreen')
  if (!img) return null
  return img.path
}

export interface RequestViewProps {
  request: Request
}

export const RequestView: FunctionComponent<RequestViewProps> = ({ request }) => {
  const backgroundImage = findBackgroundImage(request.neighborhood)
  const classes = useStyles({ imgUrl: backgroundImage || '' })

  return (
    <section className='request'>
      <Card className={classes.card}>
        <CardHeader title={`A night out in ${request.neighborhood.name}`} />
        {backgroundImage ?
          <CardMedia
            className={classes.media}
            image={backgroundImage}
            title={request.neighborhood.name}
          /> : null}
        <CardContent>
          <dl className={classes.dlgrid}>
            <dt>Date:</dt><dd>{moment(request.start_window).calendar()} - {hoursBetween(new Date(request.start_window), new Date(request.end_window))} hours</dd>
            <dt>Party Size:</dt><dd>{request.n_people}</dd>
            <dt>Price Range:</dt><dd>{request.price_range.name}</dd>
            <dt>Neighborhood:</dt><dd>{request.neighborhood.name}</dd>
            <dt>Notes:</dt><dd>{request.notes || 'None'}</dd>
            <dt>Contacts:</dt><dd>{request.contacts.length ?
              request.contacts.map(c => c.phone_number).join(', ') :
              'None'}</dd>
          </dl>
        </CardContent>
      </Card>
    </section>
  )
}
