import React from "react";
import Card from "./Card";

const CardList = ({ cards, onEdit, onDelete }) => {
  return (
    <div className="bg-white m-4 p-8 rounded-lg">
      <h2 className="text-3xl mb-2 font-bellota">Cards</h2>
      <p className="text-md mb-8 font-bellota">Aprende repasando tus flashcards</p>
      <div className="grid grid-cols-4 gap-4 bg-white rounded-lg">
        {cards.map((card, index) => (
          <Card key={index} question={card.pregunta} answer={card.respuesta} id={card._id} onEdit={onEdit} onDelete={onDelete}/>
        ))}
      </div>
    </div>
  );
};

export default CardList;
