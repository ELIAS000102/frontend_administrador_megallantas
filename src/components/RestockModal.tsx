"use client";
import React from "react";
import { IconX, IconPackage } from "@tabler/icons-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const RestockModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para conectar con tu backend
    alert("Solicitud de reposición enviada correctamente");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <IconPackage className="text-blue-600" />
            Reponer Stock
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <IconX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
            <select className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Seleccionar producto crítico...</option>
              <option value="1">Llanta Michelin 205/55 R16 (Stock: 2)</option>
              <option value="2">Aceite Sintético 5W-30 (Stock: 1)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad a Ingresar</label>
            <input 
              type="number" 
              min="1"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ej. 50"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md"
            >
              Confirmar Reposición
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};