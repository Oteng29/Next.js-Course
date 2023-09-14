export async function getAllEvents() {
    const response = await fetch('https://next-js-course-01-default-rtdb.firebaseio.com/events.json')
    const data = await response.json();

    const events = [];

    for (const key in data) {
        events.push({
           id: key ,
           ...data[key]
        })
    }

    return events;
}
 
export async function getFeaturedEvents() {
    try {
        const allEvents = await getAllEvents(); // Make sure to await the result

        if (!Array.isArray(allEvents)) {
            throw new Error('getAllEvents did not return an array.');
        }

        return allEvents.filter((event) => event.isFeatured);
    } catch (error) {
        console.error('Error in getFeaturedEvents:', error.message);
        return []; // Return an empty array or handle the error accordingly
    }
}


export async function getEventById(id) {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;

    const allEvents = await getAllEvents();
  
    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
      );
    });
  
    return filteredEvents;
}
