// src/components/Modal.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Modal = ({ isOpen, onClose, onSave, initialQuestion, initialAnswer, id="", noEdit=true, noDelete=true}) => {
  const [pregunta, setPregunta] = useState(initialQuestion || "");
  const [respuesta, setRespuesta] = useState(initialAnswer || "");

  useEffect(() => {
    setPregunta(initialQuestion || "");
    setRespuesta(initialAnswer || "");
  }, [initialQuestion, initialAnswer]);

  const handleSave = async () => {
    if (pregunta && respuesta) {
        if (noEdit && noDelete) {
            try {
                const newCard = { pregunta, respuesta }; // Crear un objeto con la nueva tarjeta
                console.log(newCard); // Imprimir la nueva tarjeta
                // Hacer la solicitud POST para crear la tarjeta
                const response = await axios.post("http://localhost:3000/api/create-card", newCard);
                newCard._id = response.data._id; // Imprimir la respuesta del servidor
                onSave(newCard); // Pasar la nueva tarjeta al componente Main
                console.log(newCard); // Imprimir la nueva tarjeta
                onClose(); // Cerrar el modal
                setPregunta(""); // Limpiar el campo de pregunta
                setRespuesta(""); // Limpiar el campo de respuesta
              } catch (error) {
                console.error("Error creando la tarjeta:", error);
              }
        } else if (!noEdit && noDelete) {
            try {
                onSave(pregunta, respuesta);
                onClose();
            } catch (error) {
                console.error("Error actualizando la tarjeta:", error);
            }
        }         
    }
  };

  if (!isOpen) return null; // No mostrar nada si el modal no está abierto

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 shadow-lg">
        {noEdit 
        ? <h2 className="text-lg font-bold mb-4 font-bellota">Agregar Nueva Card</h2>
        : ""
        }
        <div className="mb-2">
          <label className="block mb-1 font-bellota">Pregunta:</label>
          <input
            type="text"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            className="border rounded p-2 w-full font-bellota"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bellota">Respuesta:</label>
          <input
            type="text"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            className="border rounded p-2 w-full font-bellota"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-emerald-500 text-white rounded px-4 py-2">
            Guardar
          </button>
          <button onClick={onClose} className="ml-2 border rounded px-4 py-2">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
