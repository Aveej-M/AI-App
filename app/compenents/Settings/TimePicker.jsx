import { useState, useRef, useEffect } from "react";

function CustomTimePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [hour, minute] = value ? value.split(":") : ["", ""];
  const pickerRef = useRef(null);
  const hoursRef = useRef(null);

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = ["00", "30"];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHourSelect = (h, idx) => {
    onChange(`${h}:${minute || "00"}`);

    // scroll the selected hour to top
    if (hoursRef.current) {
        const hourElements = hoursRef.current.children;
        if (hourElements[idx]) {
        hourElements[idx].scrollIntoView({
            block: "start", // align to the top
            behavior: "smooth",
        });
        }
    }
    };


  const handleMinuteSelect = (m) => {
    onChange(`${hour || "00"}:${m}`);
  };

  return (
    <div className="relative w-40" ref={pickerRef}>
      {/* Input box */}
      <div
        onClick={() => setOpen(!open)}
        className="border px-2 py-1 border-gray-400 text-gray-400 rounded cursor-pointer bg-white"
      >
        {value || "Select time"}
      </div>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute z-10 mt-1 w-2/3 bg-white border border-gray-300 rounded shadow-lg flex">
          {/* Hours column (scrollable) */}
          <div
            ref={hoursRef}
            className="max-h-48 overflow-y-auto scrollbar-hide scrollbar-hover w-1/2 border-r border-r-gray-400"
          >
            {hours.map((h, idx) => (
              <div
                key={h}
                onClick={() => handleHourSelect(h, idx)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  h === hour ? "bg-green-100 font-semibold" : ""
                }`}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Minutes column (fixed) */}
          <div className="w-1/2">
            {minutes.map((m) => (
              <div
                key={m}
                onClick={() => handleMinuteSelect(m)}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  m === minute ? "bg-green-100 font-semibold" : ""
                }`}
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TimeRangeInput() {
  const [fromTime, setFromTime] = useState("09:00");
  const [toTime, setToTime] = useState("06:00");

  return (
    <div className="flex gap-6">
      <label htmlFor="">{}</label>
       <div className="flex items-center gap-6">
            <CustomTimePicker value={fromTime} onChange={setFromTime} />
            <label className="text-gray-400">to</label>
            <CustomTimePicker value={toTime} onChange={setToTime} />
        </div>
    </div>
  );
}
