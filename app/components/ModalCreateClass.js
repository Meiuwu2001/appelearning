// components/ModalCreateClass.js
"use client";

import React from "react";
import { Transition } from "@headlessui/react";

const ModalCreateClass = ({ show, onClose, children, onConfirm }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <Transition
        show={show}
        enter="transition-opacity ease-in duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        />
      </Transition>
      <Transition
        show={show}
        enter="transition-transform ease-in-out duration-300"
        enterFrom="transform scale-75"
        enterTo="transform scale-100"
        leave="transition-transform ease-in-out duration-300"
        leaveFrom="transform scale-100"
        leaveTo="transform scale-75"
      >
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={onClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h3 className="text-lg font-bold mb-4">Crear Nueva Clase</h3>
          <div className="mt-4">
            {children}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default ModalCreateClass;
