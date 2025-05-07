// src/widgets/layout/Sidenav.jsx

import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useAuth } from "@/context/AuthContext";

const sidenavBackgrounds = {
  light: "bg-gradient-to-br from-gray-50 to-gray-100",
  dark: "bg-gradient-to-r from-gray-900 to-gray-800",
  white: "bg-white shadow-lg",
  transparent: "bg-transparent",
};

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const { user } = useAuth();
  if (user === undefined) {
    return null;
  }

  const filteredRoutes = routes
    .map((route) => ({
      ...route,
      pages: route.pages.filter((page) =>
        !page.allowedRoles || page.allowedRoles.includes(user.idrol)
      ),
    }))
    .filter(route => route.pages.length > 0);

  return (
    <aside
      className={`${sidenavBackgrounds[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-y-0 left-0 z-50 w-80 rounded-r-xl transition-all duration-300 xl:translate-x-0 border-r border-gray-200 shadow-xl`}
    >
      <div className="relative border-b border-gray-200">
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="font-bold"
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color={sidenavType === "dark" ? "white" : "gray"}
          size="sm"
          ripple={false}
          className="absolute right-2 top-2 grid rounded-full xl:hidden hover:bg-gray-200 hover:bg-opacity-50"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>

      <div className="m-4 h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
        {filteredRoutes.map(({ layout, title, pages }, key) => (
          pages.length > 0 && (
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mx-3.5 mt-4 mb-2">
                  <Typography
                    variant="small"
                    color={sidenavType === "dark" ? "blue-gray-300" : "blue-gray-600"}
                    className="font-bold uppercase opacity-80 tracking-wider"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              {pages.map(({ icon, name, path }) => (
                <li key={name}>
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant="text"
                        color={sidenavType === "dark" ? "white" : "gray"}
                        className={`flex items-center gap-4 px-6 py-3 capitalize transition-all duration-200 rounded-lg ${isActive
                            ? "bg-blue-500 text-white shadow-md hover:shadow-lg"
                            : sidenavType === "dark"
                              ? "text-blue-gray-200 hover:bg-white/10 hover:text-white"
                              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        fullWidth
                      >
                        {React.cloneElement(icon, {
                          className: `h-5 w-5 ${isActive
                              ? 'text-white'
                              : sidenavType === 'dark'
                                ? 'text-blue-gray-300'
                                : 'text-gray-500'
                            }`
                        })}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          )
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          border: 1px solid transparent;
          background-clip: content-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, 0.3);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.2) rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "SICOMIL",
  routes: [],
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;