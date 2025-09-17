'use client'
import { usePathname } from "next/navigation";
import BodyLayout from "./compenents/BodyLayout";
import Drawer from "./compenents/Drawer"

export default function HomeLayout({children}) {
    const pathName = usePathname();

    // const homeLayout = pathName !== "/settings/Home";
    const homeLayout = pathName.startsWith("/settings");

    return(
        <div className="w-full h-[100dvh]">
            {!homeLayout && <BodyLayout />}
            
            <div className={`flex w-full relative ${homeLayout ? 'top-0' : 'top-[67px]'}`}>
               {!homeLayout && <Drawer />} 
                {children}
            </div>
        </div>
    )
}
