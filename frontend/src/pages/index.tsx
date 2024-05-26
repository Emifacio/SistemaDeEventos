import React from 'react';
import EventInterface from '../components/EventInterface';

const Home: React.FC = () => {
  return (
    <div>
      <EventInterface backendName="flask" />
    </div>
  );
}

export default Home;