"use client";

import { HiOutlineTrash } from "react-icons/hi2";

interface DeleteButtonProps {
  id: number | string;
  roomName: string;
  action: (id: number | string, roomName: string) => void | Promise<void>;
}

function DeleteButton({ action, id, roomName }: DeleteButtonProps) {
  return (
    <button
      onClick={() => action(id, roomName)}
      className="flex cursor-pointer items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-red-500/70 uppercase transition-all hover:text-red-500 active:scale-90"
    >
      <HiOutlineTrash size={16} />
      Delete
    </button>
  );
}

export default DeleteButton;
