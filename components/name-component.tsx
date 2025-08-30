"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";

const letters = [
    "S", "o", "l", "o", "m", "o", "n"
];

export default function NameComponent() {
    // Get the current day of the week (0 = Sunday, 6 = Saturday)
    const dayOfWeek = new Date().getDay();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const letterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          // Only close if click is outside the modal
          if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
              setIsOpen(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        }
      }, [isOpen]);
  
    return (
        <span className="relative">
            {letters.map((l, i) => {
                // Only attach ref to the current day letter
                const isCurrent = i === dayOfWeek;
                return (
                    <span
                        key={i}
                        ref={isCurrent ? letterRef : undefined}
                        style={{
                            color: isCurrent ? "#888888" : "#fff",
                            transition: "color 0.3s"
                        }}
                        className={isCurrent ? "cursor-pointer relative" : ""}
                        onClick={() => {
                            if (isCurrent) setIsOpen((prev) => !prev);
                        }}
                    >
                        {l}
                        {isCurrent && isOpen && (
                            <ModalMessage onClose={() => setIsOpen(false)} modalRef={modalRef}/>
                        )}
                    </span>
                );
            })}
        </span>
    );
}

function ModalMessage({ onClose, modalRef }: { onClose: () => void , modalRef: React.RefObject<HTMLDivElement | null>}) {
    return (
        <div ref={modalRef}
            className="challenge absolute left-1/2 top-full mt-2 transform -translate-x-1/2 bg-[#171616] flex items-center justify-center z-20 min-w-[300px] min-h-[120px] rounded-xl border-gray-400 border-2 p-6 cursor-default shadow-lg"
        >
            <button
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                onClick={e => {
                    e.stopPropagation();
                    onClose();
                }}
                aria-label="Close"
            >
                <XMarkIcon className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center w-full mx-auto select-none space-y-4">
                <span className="text-[17px] font-bold text-gray-200">!Hall of Shame Challenge</span>
                <p className="text-sm text-gray-300 text-center">
                    If you can figure out why this button was greyed out, you get a spot on the !hall of shame.<br />
                    <a href="#" className="cursor-pointer underline text-gray-500">Scroll down</a> to the answer section to add your answer if you think youve got it.
                </p>
            </div>
        </div>
    );
}