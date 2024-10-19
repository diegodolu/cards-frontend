import React, { useState } from "react";
import image from "../.././../../assets/bg-gradient.png";
import imageResponse from "../.././../../assets/bg-sea.png";
import Modal from "../Modal"; // Asegúrate de importar tu componente Modal

const Card = ({ question, answer, onEdit, onDelete, id }) => {
  const [flipped, setFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updatedQuestion, setUpdatedQuestion] = useState(question);
  const [updatedAnswer, setUpdatedAnswer] = useState(answer);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleEditClick = () => {
    setIsModalOpen(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  const handleSave = (pregunta, respuesta) => {
    const updatedCard = {
      pregunta: pregunta,
      respuesta: respuesta,
    };
    
    onEdit(id, updatedCard); // Llama a la función onEdit pasada por props
    handleCloseModal(); // Cierra el modal
  };

  const handleDelete = () => {
    onDelete(id); // Llama a la función onDelete pasada por props
  }

  return (
    <div className="relative w-64 h-64 perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Parte frontal de la tarjeta */}
        <div
          className="absolute w-full h-full bg-gradient-to-b from-orange-200 to-white p-8 flex flex-col gap-6 items-center shadow-lg backface-hidden rounded-lg"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="text-center font-bellota font-bold text-xl">
            {question}
          </p>
          <a
            href="#"
            className="bg-white rounded-md p-2 border-2 w-48 text-center font-bellota"
            onClick={(e) => {
              e.preventDefault();
              handleFlip();
            }}
          >
            Mostrar respuesta
          </a>
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="p-2 text-white hover:bg-blue-600 transition ease-in-out duration-300 shadow-md shadow-gray-500/50 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                handleEditClick(); // Abre el modal para editar
              }}
            >
              <span className="material-symbols-outlined">edit</span>
            </a>
            <a
              href="#"
              className="p-2 text-white hover:bg-red-500 transition ease-in-out duration-300 shadow-md shadow-gray-500/50 rounded-md"
              onClick={(e)=>{
                e.preventDefault();
                handleDelete();
              }}
            >
              <span className="material-symbols-outlined">delete</span>
            </a>
          </div>
        </div>

        {/* Parte trasera de la tarjeta */}
        <div
          className="absolute w-full h-full bg-gradient-to-b from-orange-200 to-white p-8 flex flex-col gap-3 items-center shadow-lg backface-hidden rounded-lg"
          style={{
            backgroundImage: `url(${imageResponse})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="font-bold text-center font-bellota">{answer}</p>
          <a
            href="#"
            className="bg-white rounded-md p-2 border-2 w-48 text-center font-bellota"
            onClick={(e) => {
              e.preventDefault();
              handleFlip();
            }}
          >
            Ocultar respuesta
          </a>
        </div>
      </div>

      {/* Modal para editar tarjeta */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialQuestion={question}
        initialAnswer={answer}
        noEdit={false}
        id={id}
      />
    </div>
  );
};

export default Card;
