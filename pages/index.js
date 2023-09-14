import { getFeaturedEvents } from '../helpers/api-util'
import { getAllEvents } from '@/dummy-data'
import EventList from '../components/events/eventList';

export default function HomePage() {
  const featuredEvents = getAllEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  )
}

export async function getStaticProps(context){
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    }
  }
}

