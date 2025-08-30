"use client";
import { useEffect, useRef, useState } from "react";
import { SlashIcon, XMarkIcon, CalendarIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import img from "@/assets/purple-white.png";

const jobs: {
  label: string;
  href: string;
  logo: string;
  description: string;
  title: string;
  startDate: string;
  endDate: string;
}[] = [
  {
    label: "Lintern",
    href: "https://www.linuxfoundation.org/",
    logo: img.src,
    description:
      "I was fortunate to contribute to some of the biggest open-source projects in the world, including the Linux kernel.",
    title: "Software Engineer 2",
    startDate: "2021",
    endDate: "Present",
  },
  {
    label: "Vendeor",
    href: "https://archlinux.org/",
    logo: img.src,
    description:
      "I was fortunate to contribute to some of the biggest open-source projects in the world, including the Linux kernel.",
    title: "Software Engineer 2",
    startDate: "2021",
    endDate: "2023",
  },
  {
    label: "Accave",
    href: "https://www.un.org/",
    logo: img.src,
    description:
      "I was fortunate to contribute to some of the biggest open-source projects in the world, including the Linux kernel.",
    title: "Software Engineer 2",
    startDate: "2021",
    endDate: "2023",
  },
];

export default function QuickJobsHome() {
  const [openModal, setOpenModal] = useState<null | string>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Store modal position
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number; transform: string } | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpenModal(null);
        setModalPosition(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  // Calculate modal position when openModal changes
  useEffect(() => {
    if (openModal && triggerRefs.current[openModal]) {
      const trigger = triggerRefs.current[openModal];
      const modalWidth = 340; // Approximate modal width (px)
      const modalHeight = 260; // Approximate modal height (px)
      const padding = 12; // px

      if (trigger) {
        const rect = trigger.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let top = rect.top - modalHeight - padding;
        let left = rect.left;

        let transform = "";

        // If not enough space above, show below
        if (top < 0) {
          top = rect.bottom + padding;
        }

        // If modal would go off right edge, shift left
        if (left + modalWidth > viewportWidth - padding) {
          left = viewportWidth - modalWidth - padding;
        }
        // If modal would go off left edge, shift right
        if (left < padding) {
          left = padding;
        }

        // If modal would go off bottom, shift up
        if (top + modalHeight > viewportHeight - padding) {
          top = viewportHeight - modalHeight - padding;
        }
        if (top < padding) {
          top = padding;
        }

        setModalPosition({ top, left, transform });
      }
    } else {
      setModalPosition(null);
    }
  }, [openModal]);

  return (
    <>
      <div className="flex items-center flex-wrap gap-4 text-md mt-14 mx-auto lg:mx-0 w-full lg:w-auto">
        {jobs.map((job) => (
          <div
            key={job.label}
            className={`flex items-center gap-2 cursor-pointer relative text-sm ${
              jobs.indexOf(job) === 0 || openModal === job.label
                ? "opacity-100"
                : "opacity-50 hover:opacity-100 transition-opacity duration-300"
            }`}
            ref={(el) => {
              triggerRefs.current[job.label] = el;
            }}
            onClick={() => {
              if (openModal === job.label) {
                setOpenModal(null);
                setModalPosition(null);
              } else {
                setOpenModal(job.label);
              }
            }}
          >
            {openModal === job.label && modalPosition && (
              <Modal
                job={job as any}
                modalRef={modalRef as any}
                onClose={() => {
                  setOpenModal(null);
                  setModalPosition(null);
                }}
                position={modalPosition}
              />
            )}
            <img src={job.logo} alt={job.label} className="w-8 h-8" />
            <h3>
              {job.label}
              {jobs.indexOf(job) != 0 && <span className="text-xs text-gray-500"> (Past)</span>}
            </h3>
            {jobs.indexOf(job) !== jobs.length - 1 && <SlashIcon className="w-6 h-8" />}
          </div>
        ))}
      </div>
    </>
  );
}

function Modal({
  job,
  modalRef,
  onClose,
  position,
}: {
  job: {
    label: string;
    href: string;
    logo: string;
    description: string;
    title: string;
    startDate: string;
    endDate: string;
  };
  modalRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  position: { top: number; left: number; transform: string };
}) {
  return (
    <div
      className="job-modal fixed bg-[#171616] flex items-start justify-center z-50 min-w-[300px] max-w-[90vw] min-h-[200px] rounded-xl border-gray-400 border-2 p-3 cursor-default shadow-2xl"
      ref={modalRef}
      style={{
        top: position.top,
        left: position.left,
        transform: position.transform,
        width: "340px",
        maxWidth: "90vw",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start gap-2 relative h-full flex-col w-full mx-auto select-none space-y-2">
        <XMarkIcon
          className="close-btn w-5 h-5 cursor-pointer absolute top-0 right-0"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        />
        <div className="flex items-center gap-2 mb-2">
          <img src={job.logo} alt={job.label} className="w-8 h-8" />
          <span>
            <h3>{job.label}</h3>
            <p className="text-gray-400">{job.title}</p>
          </span>
        </div>
        <p>{job.description}</p>
        <p className="flex items-center gap-2 text-xs text-gray-400">
          <CalendarIcon className="w-4 h-4" /> {job.startDate} to {job.endDate}
        </p>
        <a
          href={job.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 flex items-center gap-2 hover:text-gray-300 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          Visit Website <ArrowLongRightIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}