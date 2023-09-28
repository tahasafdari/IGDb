import React from 'react';
import Link from 'next/link';
import { IRoute } from '@/types/navigation';

interface SidebarProps {
  routes: IRoute[];
}

const Sidebar: React.FC<SidebarProps> = ({ routes }) => {
  return (
    <div className="flex flex-col w-64 h-screen bg-gray-800 text-white shadow-lg">
      <div className="flex items-center justify-center py-6">
        {/* Add your logo or title here */}
        <span className="text-2xl font-semibold">Your Logo</span>
      </div>
      <nav>
  <ul>
    {routes.map((route, index) => (
      <li key={index} className="hover:bg-gray-700">
        <Link href={route.path} passHref>
          {/* Applying styling directly to span */}
          <span className="font-bold text-lg hover:text-white px-4 py-2 flex items-center justify-center space-x-2">
            {route.icon && <route.icon className="mr-2"/>}
            {route.name}
          </span>
        </Link>
      </li>
    ))}
  </ul>
</nav>


    </div>
 
  );
};

export default Sidebar;
