'use client'
import { useState } from "react";
import timeZones from "@/app/data/timezone";
import { customStyles } from "../../../data/selectStyle";
import WorkingDaysSelector from "../../../compenents/Settings/WorkingDays";
import Select from "react-select";

const page = () => {
    const [name, setName] = useState('General Working Hours');
    const [defaultDescription, setDefaultDescription] = useState('Default Business Calendar');
    const [showDescription, setShowDescription] = useState(false);
    const [timeZone, setTimeZone] = useState('');
    const [businessHolidays, setBusinessHolidays] = useState(0);
    const [selectedBusiness, setSelectedBusiness] = useState(1);
    // Default: at least one selected (e.g., Monday)
    const [selectedDays, setSelectedDays] = useState(["Mon"]);

    const tableHead = ['Name', 'Date', 'More'];

  return (
    <>
        <div className='p-5 w-full'>
            <form action="" className="flex flex-col">
                <label htmlFor="name">Name(For Own Reference) <span className='text-red-500'>*</span></label>
                <input type="text" 
                id="name"
                className='form-input w-1/2! border-l-2! border-l-green-500!' 
                placeholder='e.g.India Business Hours' 
                value={name}
                onChange={(e) => setName(e.target.value)}
                />

                {!showDescription && (
                <div onClick={() => setShowDescription(true)} className="flex items-center gap-3 mt-5">
                    <h1>{defaultDescription}</h1>
                    <i className="fa-regular fa-pen-to-square cursor-pointer"></i>
                </div>
                )}
                {showDescription && (
                    <div className="mt-5 flex flex-col">
                        <label htmlFor="description">Description</label>
                        <textarea name=""
                        id="description" 
                        rows={4} 
                        value={defaultDescription}
                        onChange={(e) => setDefaultDescription(e.target.value)}
                        className='topic-formInput w-1/2! py-3'></textarea>

                        <button 
                        className=" px-4 h-8 mt-2 w-fit text-green-400 border border-gray-400 rounded-[20px] hover:bg-gray-100 hover:text-green-500 transition"
                        onClick={() => setShowDescription(false)}>Close</button>
                    </div>
                )}

                {/* <div className="w-full mt-5">
                    <label htmlFor="time-zone-select" className='text-black'>Time Zone <span className='text-red-500'>*</span></label>
                    <Select 
                        instanceId="time-zone-select"   
                        options={timeZones}
                        value={timeZones.find(option => option.value === timeZone)}
                        onChange={(e)=> setTimeZone(e.value)}
                        styles={customStyles}
                        placeholder="Enter Time Zone"
                        isSearchable
                        className='w-1/2!'
                        components={{
                        IndicatorSeparator: () => null
                        }}
                    />
                </div> */}

                <div className="flex items-center gap-5 mt-7 shadow-64">
                    
                        <p onClick={()=> setBusinessHolidays(0)} className={`${businessHolidays === 0 && 'text-green-500 border-b-green-500 border-b-2'} ${businessHolidays === 1 && 'hover:text-green-300 transition-all duration-300 ease-in-out'} cursor-pointer pb-3`}>Bussiness Hours</p>
                    
                    
                        <p onClick={()=> setBusinessHolidays(1)} className={`${businessHolidays === 1 && 'text-green-500 border-b-green-500 border-b-2 cursor-pointer'} ${businessHolidays === 0 && 'hover:text-green-300  transition-all duration-300 ease-in-out'} cursor-pointer pb-3`}>Holidays</p>
                    
                </div>

                {businessHolidays === 0 ? (
                <div className="mt-5">
                    <h1 className="mb-3 font-semibold">Set business hours</h1>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                        type="radio"
                        name="roundedSelect"
                        checked={selectedBusiness === 0}
                        onChange={() => setSelectedBusiness(0)}
                        className="hidden"
                        />
                        <span
                        className={`w-4 h-4 flex items-center justify-center rounded-full border-2 transition 
                            ${selectedBusiness === 0 ? "bg-green-500 border-green-500" : "border-gray-400"}`}
                        >
                        {selectedBusiness === 0 && (
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                        )}
                        </span>
                        <span>24 hrs x 7 days</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer mt-2">
                        <input
                        type="radio"
                        name="roundedSelect"
                        checked={selectedBusiness === 1}
                        onChange={() => setSelectedBusiness(1)}
                        className="hidden"
                        />
                        <span
                        className={`w-4 h-4 flex items-center justify-center rounded-full border-2 transition 
                            ${selectedBusiness === 1 ? "bg-green-500 border-green-500" : "border-gray-400"}`}
                        >
                        {selectedBusiness === 1 && (
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                        )}
                        </span>
                        <span>Custom business hours</span>
                    </label>
                    {selectedBusiness === 1 && (
                    <div className="mt-4">
                        <WorkingDaysSelector selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
                    </div>
                )}
                </div>    
                ) : (
                    <div>
                        <div className="flex items-center gap-15 mt-5">
                            <p className="text-gray-400">Holidays will be ignored when calculating SLA for a ticket.</p>
                            <button className="px-3 border h-8 min-w-[160px] border-gray-400 rounded-3xl hover:text-green-500 hover:border-green-500">+ Add Holidays</button>
                        </div>

                        <table className="w-[50%]">
                            <thead>
                                <tr className="bg-green-100 shadow-64">
                                    <th className="px-5 py-3">Name</th>
                                    <th className="px-5 py-3">Date</th>
                                    <th className="px-5 py-3">More</th>
                                </tr>
                            </thead>
                                <tbody className="bg-gray-100">
                                    <tr>
                                        <td>Ayyudha Poojai</td>
                                        <td>01 Oct 2025</td>
                                        <td>Delete</td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                )}  

            </form>
        </div>
    </>
  )
}

export default page