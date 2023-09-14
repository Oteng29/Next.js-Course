import { Fragment } from 'react';

import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/eventList';
import EventsSearch from '@/components/events/event-search';
import { useRouter } from 'next/router';

export default function AllEventPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventHandler}/>
      <EventList items={events}/>
    </Fragment>
  )
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events
    },
    revalidate: 60
  };
}
