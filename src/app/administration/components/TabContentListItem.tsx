"use client";

import ConfirmationModal from "@components/ConfirmationModal";
import React, { useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

interface TabContentListItemProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
  modalTitle?: string;
  modalText?: string;
}

export const TabContentListItem: React.FC<TabContentListItemProps> = ({
  id,
  name,
  onDelete,
  modalTitle = "Potvrda brisanja",
  modalText,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <li key={id} className="flex flex-row justify-between py-3 px-2 hover:bg-gray-50">
        <p className="text-gray-800">{name}</p>
        <div>
          <FaEdit className="inline-block text-gray-500  mr-2 cursor-pointer mx-1 hover:text-blue-500" />
          <FaRegTrashAlt
            className="inline-block text-gray-500 cursor-pointer mx-1 hover:text-red-500"
            onClick={() => setModalOpen(true)}
          />
        </div>
      </li>
      {modalOpen && (
        <ConfirmationModal
          title={modalTitle}
          text={modalText || "Jeste li sigurni da želite obrisati ovaj unos?"}
          onCancel={() => setModalOpen(false)}
          onConfirm={() => {
            onDelete(id);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
};
