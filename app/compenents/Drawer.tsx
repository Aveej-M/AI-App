'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, BookOpen, MessageCircle, Sparkles, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`min-h-[92dvh] h-[92dvh] sticky top-[67px] z-0 ${
          isCollapsed ? 'w-20' : 'w-64'
        } bg-gray-100 flex flex-col justify-between p-4 border-r border-gray-200 transition-all `}
      >
        <div>
          <nav className="space-y-2">
            <Link
              href="#"
              className={`dashboard-active ${ isCollapsed ? 'justify-center ' : 'justify-start'}`}
            >
              
              <Image 
                src="/dashboard.png"
                alt="dashboard icon"
                width={20}
                height={20}
                />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
            <Link
              href="#"
              className={`dashboard-active ${ isCollapsed ? 'justify-center ' : 'justify-start'}`}
            >
              
              <Image 
                src="/book-icon.png"
                alt="knowledge icon"
                width={20} height={20}
                className='w-[20px]'
                />
              {!isCollapsed && <span>Knowledge Base</span>}
            </Link>
            <Link
              href="#"
              className={`dashboard-active ${ isCollapsed ? 'justify-center ' : 'justify-start'}`}
            >
              <Image 
                src="/Vector.png"
                alt="vector icon"
                width={20} height={20}
                />
              {!isCollapsed && <span>Live Chat</span>}
            </Link>
            <Link
              href='/ai'
              className={`dashboard-active ${ isCollapsed ? 'justify-center ' : 'justify-start'}`}
            >
              <Image 
                src="/ai-icon.png"
                alt="Ai icon"
                width={20} height={20}
                />
              {!isCollapsed && <span>Ai Agent</span>}
            </Link>
          </nav>
        </div>

        {/* Collapse Toggle Button */}
        <div className="flex justify-end pr-2">
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="p-2 rounded-md hover:bg-gray-200 transition"
          >
            {isCollapsed ? (
              <ChevronsRight className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronsLeft className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Drawer Panel */}
      {/* <div
        className={`fixed inset-y-0 left-0 transform ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="absolute top-4 right-4 text-gray-600 text-xl"
        >
          ✕
        </button>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">AI Agent Panel</h2>
          <p>Insert drawer content here...</p>
        </div>
      </div> */}

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}
    </>
  );
}
