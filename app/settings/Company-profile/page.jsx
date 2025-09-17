'use client'
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import CountrySelector from "../../compenents/CountryForm";
import PhoneinputSelector from "../../compenents/PhoneinputSelector";
import countries from "../../data/countryCodeData";
import TimeZoneForm from "../../compenents/TimeZoneForm";
import { customStyles } from '../../data/selectStyle';
import timeZones from "@/app/data/timezone";
import { countryOptions } from '../../data/countryData';
import { countryCurrencies } from "../../data/currencyData";
import Select from 'react-select';

const page = () => {
    const [country, setCountry] = useState('');
    const [currency, setCurrency] = useState('');
    const [timeZone, setTimeZone] = useState('');
    const [uploadLogo, setUploadLogo] = useState('');
    const fileInputRef = useRef(null);
    const [selectedCountry, setSelectedCountry] = useState(null); // start with no selection
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const positionTop = '-top-55';

    const handleUpload = (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setUploadLogo(base64);      // store single image only
        // setSelectedAvatar(base64);  // optional: use as preview/avatar
      };
      reader.readAsDataURL(file);
    };

    
  return (
    <div className='w-full h-auto flex justify-between'>
      <div className="flex-items w-full">
        <form action="" className="flex items-center flex-col w-[560px] p-10 shadow-1 rounded">
          <div
            className={`w-20 h-20 mb-3 ${!uploadLogo && 'border-2'} border-dotted border-gray-400 hover:border-green-500 rounded-full flex justify-center items-center cursor-pointer`}
            onClick={() => fileInputRef.current.click()}
          >
            {uploadLogo ? 
            <Image 
            src={uploadLogo}
            alt="Logo"
            width={50}
            height={50}
            className="w-20 h-20 rounded-[50%]"
            />
            : <i className="fa-solid fa-camera text-2xl text-gray-400 p-2 shadow-5 rounded-[50%]"></i> }
            
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleUpload}
              className="hidden"
            />
          </div>
          {uploadLogo ? <i onClick={()=> setUploadLogo('')} className="fa-regular fa-trash-can text-red-500 hover:bg-gray-200 px-1.5 pb-1 pt-1.5 rounded-[20px] relative bottom-10 left-12 cursor-pointer transition duration-300"></i> :
          <p className="mb-5 text-gray-600">Upload Brand Logo</p> }
          
          <div className=' flex-items-2 gap-1 mb-5 p-2 text-[14px] bg-green-200/80 border border-green-500 rounded'>
            <i className="fa-solid fa-circle-info text-green-500"></i>
            <p className='text-green-500'>Preferred Image Size: 240px x 48px @ 72 DPI. Maximum size of 1MB.</p>
          </div>

          <div className="w-full mb-5">
            <label htmlFor="">Organisation Name <span className='text-red-500'>*</span></label>
            <input type="text" id='firstname' maxLength={20} className='form-input border-l-2! border-l-green-500!' />
          </div>

          <div className="w-full mb-5">
            <label htmlFor="country">Country <span className='text-red-500'>*</span></label>
            <Select 
                instanceId="country"   
                options={countryOptions}
                value={countryOptions.find(option => option.value === country)}
                // onChange={(e)=> setCountry(e.value)}
                onChange={(selected) => {
                  const countryCode = selected.value;
                  setCountry(countryCode);

                  // set currency
                  const matchedCurrency = countryCurrencies.find(c => c.value === countryCode);
                  if (matchedCurrency) setCurrency(matchedCurrency.value);

                  // set time zone (pick the first one matching country)
                  const matchedTimeZone = timeZones.find(tz => tz.country === countryCode);
                  if (matchedTimeZone) setTimeZone(matchedTimeZone.value);

                  // set phone input (dial code)
                  // if (countries[countryCode]) {
                  //   setSelectedCountry(countries[countryCode]);
                  // }

                  const phoneInfo = countries.find(c => c.code === countryCode);
                  if (phoneInfo) {
                    setSelectedCountry({
                      name: phoneInfo.label,
                      dialCode: phoneInfo.dialCode,
                      isoCode: phoneInfo.code,
                      flagUrl:phoneInfo.flagUrl,
                    });}
                }}
                styles={customStyles}
                placeholder="Enter your country"
                isSearchable
                className='w-full'
                components={{
                IndicatorSeparator: () => null
                }}
            />
          </div>

          <div className="w-full mb-5">
            <label htmlFor="currency" className='text-black'>Currency <span className='text-red-500'>*</span></label>
              <Select 
                  instanceId="currency"   
                  options={countryCurrencies}
                  value={countryCurrencies.find(option => option.value === currency)}
                  onChange={(e)=> setCurrency(e.value)}
                  styles={customStyles}
                  placeholder="Enter your currency"
                  isSearchable
                  className='w-full'
                  components={{
                  IndicatorSeparator: () => null
                  }}
              />
          </div>

          <div className="w-full mb-5">
            <label htmlFor="time-zone-select" className='text-black'>Time Zone <span className='text-red-500'>*</span></label>
              <Select 
                  instanceId="time-zone-select"   
                  options={timeZones}
                  value={timeZones.find(option => option.value === timeZone)}
                  onChange={(e)=> setTimeZone(e.value)}
                  styles={customStyles}
                  placeholder="Enter Time Zone"
                  isSearchable
                  className='w-full'
                  components={{
                  IndicatorSeparator: () => null
                  }}
              />
          </div>

          <div className="w-full mb-5">
            <PhoneinputSelector selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} 
              dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen}
              searchQuery={searchQuery} setSearchQuery={setSearchQuery} positionTop={positionTop}
              // containerRef={containerRef}
              />
          </div>

            <Link href="" className="absolute top-5 right-5 z-30">
                <button className="w-fit px-4 py-1.5 text-[16px] bg-green-500 text-white rounded-[25px] hover:bg-green-600 transition">Save</button>
            </Link>
        </form>
      </div>
      <div className='w-[30%] p-5 text-[16px] text-gray-400 bg-gray-100'>
        <h1 className='text-black mb-2'>Company Profile</h1>
        <p className='mb-5'>Set up your organization's identity and preferences.</p>
        <p className='mb-5'>Customize your brand’s details including logo, name, country, currency, time zone, and contact number. This profile powers how your brand appears across the platform ensuring consistent, localized communication with customers.</p>
        <p>Keep it up-to-date to reflect your organization accurately.</p>
      </div>
    </div>
  )
}

export default page