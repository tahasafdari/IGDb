import React, { useState } from "react";
import Link from "next/link";
import { IRoute } from "@/types/navigation";
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../../styles/sidebar.module.css';

interface SidebarProps {
  routes: IRoute[];
}
/**
 * Sidebar component for navigation.
 * 
 * This component provides a sidebar navigation menu that displays a list of routes
 * provided to it. It supports responsive design, making it suitable for both desktop and mobile
 * views. In mobile view, the sidebar can be toggled open and close with a button.
 * 
 * @param routes - An array of `IRoute` objects, where each object represents a navigation route
 * with a path, name, and optional icon.
 * 
 * @returns {JSX.Element} The rendered Sidebar component.
 * 
 * @example
 * const routes = [
 *   { path: "/home", name: "Home", icon: HomeIcon },
 *   { path: "/profile", name: "Profile", icon: UserProfileIcon }
 * ];
 * 
 * <Sidebar routes={routes} />
 */
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

      <div className={styles.navBar}

      >
        <div className="flex items-center justify-center py-6">
          <span className={styles.navTitle}>IGDB</span>
        </div>
        <nav>
          <ul>
            {routes.map((route, index) => (
              <li key={index} className={styles.navLinks}>
                <Link href={route.path} passHref>
                  <span className={styles.navLinks}>
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
