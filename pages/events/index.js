import { Fragment } from 'react';

import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/eventList';
import EventsSearch from '@/components/events/event-search';
import { useRouter } from 'next/router';

export default function AllEventPage() {
  const router = useRouter();
  const events = getAllEvents();

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
