"use client";

import { HiOutlineTrash } from "react-icons/hi2";

interface DeleteButtonProps {
  id: number | string;
  action: (id: number | string) => void | Promise<void>;
}

function DeleteButton({ action, id }: DeleteButtonProps) {
  return (
    <button
      onClick={() => action(id)}
      className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-red-500/70 uppercase transition-all hover:text-red-500 active:scale-90"
    >
      <HiOutlineTrash size={16} />
      Delete
    </button>
  );
}

export default DeleteButton;
