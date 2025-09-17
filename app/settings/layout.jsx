import SettingsHeader from "../compenents/Settings/SettingsHeader";
import Settingsleftbar from "../compenents/Settings/Settingsleftbar";

export const metadata = {
  title: "Home",
  description: "Ai platform created by winfomi",
};

export default function SettingsLayout({ children }) {
  return (
    <div className="w-full text-black fixed">
      <SettingsHeader />
      {/* No Header here */}
      <div className='flex w-full h-fit '>
        <Settingsleftbar />
        {children}
      </div>
      
      
    </div>
  );
}
