"use client";
import { useState } from "react";
import TimeDropDown from "../../compenents/Settings/TimePicker.jsx";


export default function WorkingDaysSelector({ selectedDays, setSelectedDays }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [workingHours, setWorkingHours] = useState({});

  const handleToggle = (day) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        // Prevent removing the last remaining day
        if (prev.length === 1) return prev;
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

   const handleTimeChange = (day, value) => {
    
    setWorkingHours((prev) => ({
      ...prev,
      [day]: value,
    }));

    console.log(workingHours,'Working hours')
  };

  const handleCopy = () => {
    // console.log('Data entered')
    if (selectedDays.length === 0) return;

    const firstDay = days.find((d) => selectedDays.includes(d)); // get first in correct order
    const firstValue = workingHours[firstDay] || "";
    console.log(firstDay,'Data entered')
    console.log(firstValue, 'First value')


    if (!firstValue) return;
    console.log('Data entered')

    const updated = {};
    console.log('Data entered')

    selectedDays.forEach((day) => {
      updated[day] = firstValue;
    });
    console.log(updated,'Updated')

    setWorkingHours((prev) => ({
      ...prev,
      ...updated,
    }));
    console.log(workingHours,'Working hours')
  };


  return (
    <div>
      <h1 className="mb-3 font-medium">Select the working days</h1>
      <div className="flex items-center flex-wrap gap-4">
        {days.map((day) => (
          <label
            key={day}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              value={day}
              checked={selectedDays.includes(day)}
              onChange={() => handleToggle(day)}
              className="w-4 h-4 accent-green-500 rounded"
            />
            <span>{day}</span>
          </label>
        ))}

         {/* Debug output */}
        <div className="text-sm text-gray-600">
            ({selectedDays.length === 1 ? `${selectedDays.length} day selected` : `${selectedDays.length} day's selected`})
        </div>
      </div>

      {/* Working hours per selected day */}
      <div className="mt-6">
        {days
          .filter((day) => selectedDays.includes(day))
          .map((day, idx) => (
            <div key={day} className="flex items-center gap-4">
              <div className="flex-1">
                <h2 className="font-medium mb-2">{day}</h2>
                <TimeDropDown
                  value={workingHours[day] || ""}
                  onChange={(val) => handleTimeChange(day, val)}
                />
              </div>

              {/* Copy button only for first visible day */}
              {idx === 0 && selectedDays.length > 1 && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Copy to all
                </button>
              )}
            </div>
          ))}
      </div>


     
    </div>
  );
}
