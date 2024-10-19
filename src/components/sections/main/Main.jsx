import React, { useState, useEffect } from "react";
import CardList from "./cards/CardList";
import Modal from "./Modal"; // Asegúrate de importar el Modal
import axios from "axios";


const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState([]); // Para almacenar las tarjetas

  const handleAddCard = async () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCard = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]); // Agregar nueva tarjeta al estado
  };

  const getCards = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/get-cards");
      setCards(response.data);
      console.log(response.data); // Cambiado para asegurar que se imprime la respuesta correcta
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = async (id, currentCard) => {
    try {
      console.log(id);
      console.log(currentCard);
      const response = await axios.put(`http://localhost:3000/api/update-card/${id}`, currentCard);
      console.log(response.data);
      setCards((prevCards) => {
        const index = prevCards.findIndex((card) => card._id === id);
        prevCards[index] = currentCard;
        return [...prevCards];
      });
    } catch (error) {
      console.error(error);
    }
  }

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/delete-card/${id}`);
      console.log(response.data);
      setCards((prevCards) => prevCards.filter((card) => card._id !== id));
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    getCards(); // Llama a getCards cuando el componente se monta
  }, []);

  return (
    <div className="w-full bg-emerald-100 rounded-r-lg ">
      <div className="p-8 flex justify-end">
        {/* <a href="" className=" flex items-center">
          <div className="text-black flex justify-between p-2 rounded-lg bg-white shadow-lg shadow-gray-500/50 gap-4 hover:bg-slate-700 hover:text-white transition ease-in-out duration-300">
            <span className="material-symbols-outlined">sort</span>
            <p className="font-bellota">Ordenar</p>
          </div>
        </a> */}
        <a onClick={handleAddCard} className="flex items-center cursor-pointer">
          <div className="flex justify-between p-2 shadow-lg shadow-gray-500/50 gap-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-900 hover:text-white transition ease-in-out duration-300">
            <span className="material-symbols-outlined ">note_add</span>
            <p className="font-bellota">Agregar card</p>
          </div>
        </a>
      </div>
      <CardList cards={cards} onEdit={onEdit} onDelete={onDelete}/>
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSave={handleSaveCard} 
      />
    </div>
  );
};

export default Main;
