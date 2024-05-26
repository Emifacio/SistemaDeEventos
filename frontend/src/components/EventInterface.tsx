import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from './CardComponent';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
}

interface EventInterfaceProps {
  backendName: string;
}

const EventInterface: React.FC<EventInterfaceProps> = ({ backendName }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', location: '', description: '' });
  const [updateEvent, setUpdateEvent] = useState({ id: '', name: '', date: '', location: '', description: '' });

  const backgroundColors: { [key: string]: string } = {
    flask: 'bg-blue-500',
  };

  const buttonColors: { [key: string]: string } = {
    flask: 'bg-blue-700 hover:bg-blue-600',
  };

  const bgColor = backgroundColors[backendName as keyof typeof backgroundColors] || 'bg-gray-200';
  const btnColor = buttonColors[backendName as keyof typeof buttonColors] || 'bg-gray-500 hover:bg-gray-600';

  // Fetch events
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/${backendName}/events`);
        setEvents(response.data.reverse());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [backendName, apiUrl]);

  // Create event
  const createEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/${backendName}/event`, newEvent);
      setEvents([response.data, ...events]);
      setNewEvent({ name: '', date: '', location: '', description: '' });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  // update event
  const handleUpdateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/api/${backendName}/events/${updateEvent.id}`, { name: updateEvent.name, date: updateEvent.date, location: updateEvent.location, description: updateEvent.description });
      setUpdateEvent({ id: '', name: '', date: '', location: '', description: '' });
      setEvents(
        events.map((event) => {
          if (event.id === parseInt(updateEvent.id)) {
            return { ...event, name: updateEvent.name, date: updateEvent.date, location: updateEvent.location, description: updateEvent.description };
          }
          return event;
        })
      );
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  // Delete event
  const deleteEvent = async (eventId: number) => {
    try {
      await axios.delete(`${apiUrl}/api/${backendName}/events/${eventId}`);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };


  return (
    <div className={`event-interface ${bgColor} ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}>
      <img src={`/${backendName}logo.svg`} alt={`${backendName} Logo`} className="w-20 h-20 mb-6 mx-auto" />
      <h2 className="text-xl font-bold text-center text-white mb-6">{`${backendName.charAt(0).toUpperCase() + backendName.slice(1)} Backend`}</h2>

      {/* Create user */}
      <form onSubmit={createEvent} className="mb-6 p-4 bg-blue-100 rounded shadow">
        <input
          placeholder="Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  className="mb-2 w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          placeholder="Date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded text-black"
        />

          
        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Add Event
        </button>
      </form>

      {/* Update event */}
      <form onSubmit={handleUpdateEvent} className="mb-6 p-4 bg-blue-100 rounded shadow">
        <input
          placeholder="Event Id"
          value={updateEvent.id}
          onChange={(e) => setUpdateEvent({ ...updateEvent, id: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          placeholder="Name"
          value={updateEvent.name}
          onChange={(e) => setUpdateEvent({ ...updateEvent, name: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          placeholder="Date"
          value={updateEvent.date}
          onChange={(e) => setUpdateEvent({ ...updateEvent, date: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          placeholder="Location"
          value={updateEvent.location}
          onChange={(e) => setUpdateEvent({ ...updateEvent, location: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          placeholder="Description"
          value={updateEvent.description}
          onChange={(e) => setUpdateEvent({ ...updateEvent, description: e.target.value })}
          className="mb-2 w-full p-2 border border-gray-300 rounded text-black"
        />
        <button type="submit" className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600">
          Update Event
        </button>
      </form>

      {/* Display events */}
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <CardComponent card={event} />
            <button onClick={() => deleteEvent(event.id)} className={`${btnColor} text-white py-2 px-4 rounded`}>
              Delete Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventInterface;