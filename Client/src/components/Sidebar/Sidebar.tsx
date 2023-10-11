import React, { useState } from "react";
import Link from "next/link";
import { IRoute } from "@/types/navigation";
import MenuIcon from '@mui/icons-material/Menu';

interface SidebarProps {
  routes: IRoute[];
}

const Sidebar = ({ routes }: SidebarProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative min-h-screen z-20">
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 md:hidden z-50 p-2 rounded-md bg-gray-800 text-white"
      >
        <MenuIcon />
      </button>

      <div className={`fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      
      >
        <div className="flex items-center justify-center py-6">
          <span className="text-2xl font-semibold">IGDB</span>
        </div>
        <nav>
          <ul>
            {routes.map((route, index) => (
              <li key={index} className="hover:bg-gray-700">
                <Link href={route.path} passHref>
                  <span className="font-bold text-lg hover:text-white px-8 py-4 flex items-center justify-center space-x-20">
                    {route.icon && <route.icon className="mr-2" />}
                    {route.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black opacity-50 transition-opacity ${isOpen ? 'block' : 'hidden'} md:hidden`}
      ></div>
    </div>
  );
};

export default Sidebar;
