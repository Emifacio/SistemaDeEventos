import React from 'react';

interface Card {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
}

const CardComponent: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-2 mb-2 hover:bg-gray-100">
      <div className="text-sm text-gray-600">Id: {card.id}</div>
      <div className="text-lg font-semibold text-gray-800">{card.name}</div>
      <div className="text-md text-gray-700">{card.date}</div>
      <div className="text-md text-gray-700">{card.location}</div>
      <div className="text-md text-gray-700">{card.description}</div>
    </div>
  );
};

export default CardComponent;