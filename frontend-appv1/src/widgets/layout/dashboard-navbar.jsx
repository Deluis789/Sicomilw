import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import { useAuth } from "@/context/AuthContext";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/auth/sign-in");
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md border border-gray-200 rounded-xl backdrop-blur-md bg-white/90"
        : "mx-4 my-4 px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200"
        }`}
      fullWidth={!fixedNavbar}
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center md:gap-8">
        {/* Sección de Breadcrumbs y Título */}
        <div className="capitalize">
          <Breadcrumbs
            className="bg-transparent p-0 transition-all mt-1"
            separator={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            }
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="h6"
                color="gray"
                className="font-normal opacity-80 transition-all hover:text-blue-600 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="h6 "
              color="blue-gray"
              className="font-semibold"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          {/* <Typography
            variant="h5"
            color="blue-gray"
            className="mt-1 font-bold tracking-tight"
          >
            {page}
          </Typography> */}
        </div>

        {/* Sección Derecha (Búsqueda, Iconos, Menú) */}
        <div className="flex items-center gap-3">
          {/* Campo de búsqueda */}
          <div className="md:w-56">
            <Input
              label="Buscar"
              color="blue-gray"
              // className="!border-gray-300 focus:!border-blue-500"
              containerProps={{
                className: "min-w-[100px]",
              }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>

          {/* Botón para abrir Sidenav (mobile) */}
          <IconButton
            variant="text"
            color="gray"
            className="grid xl:hidden hover:bg-gray-100 rounded-lg"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-gray-600" />
          </IconButton>

          {/* Menú de notificaciones */}
          <Menu placement="bottom-end">
            <MenuHandler>
              <IconButton
                variant="text"
                color="gray"
                className="hover:bg-gray-100 rounded-lg"
              >
                <div className="relative">
                  <BellIcon className="h-5 w-5 text-gray-600" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </div>
              </IconButton>
            </MenuHandler>
            <MenuList className="w-80 border-0 shadow-lg p-2">
              <div className="px-4 py-2 border-b border-gray-100">
                <Typography variant="h6" color="blue-gray" className="font-medium">
                  Notificaciones
                </Typography>
              </div>
              <MenuItem className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="user"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    <strong>New message</strong> from John
                  </Typography>
                  <Typography variant="small" color="gray" className="text-xs mt-1 flex items-center gap-1">
                    <ClockIcon className="h-3.5 w-3.5" /> 5 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-3">
                <Avatar
                  src="/img/logo-asana.svg"
                  alt="spotify"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    <strong>New album</strong> released
                  </Typography>
                  <Typography variant="small" color="gray" className="text-xs mt-1 flex items-center gap-1">
                    <ClockIcon className="h-3.5 w-3.5" /> 1 hour ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-400">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    Payment received
                  </Typography>
                  <Typography variant="small" color="gray" className="text-xs mt-1 flex items-center gap-1">
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
              <div className="px-4 py-2 border-t border-gray-100">
                <Button variant="text" color="blue-gray" size="sm" fullWidth>
                  Ver todas las notificaciones
                </Button>
              </div>
            </MenuList>
          </Menu>

          {/* Menú de usuario */}
          {user ? (
            <Menu placement="bottom-end">
              <MenuHandler>
                <Button
                  variant="text"
                  color="gray"
                  className="flex items-center gap-1 hover:bg-gray-100 rounded-lg px-3 py-2"
                >
                  <Avatar
                    src="/img/logo-usu.svg"
                    alt="profile"
                    size="sm"
                    variant="circular"
                  />
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-medium ml-2 hidden md:block"
                  >
                    {user.nombres}
                  </Typography>
                </Button>
              </MenuHandler>
              <MenuList className="w-48 border-0 shadow-lg p-2">
                <MenuItem className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2">
                  <Cog6ToothIcon className="h-5 w-5 text-gray-600" />
                  <Typography variant="small" className="font-normal">
                    Actualizar Contraseña
                  </Typography>
                </MenuItem>
                <div className="border-t border-gray-100 my-2"></div>
                <MenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 text-gray-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h5.5A2.25 2.25 0 0118 15.75V4.25A2.25 2.25 0 0115.75 2h-5.5A2.25 2.25 0 018 4.25v2a.75.75 0 01-1.5 0v-2z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Typography variant="small" className="font-normal">
                    Cerrar sesión
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/auth/sign-in">
              <Button
                variant="gradient"
                color="blue"
                size="sm"
                className="rounded-lg"
              >
                Iniciar sesión
              </Button>
            </Link>
          )}

          {/* Botón de configuración */}
          {/* <IconButton
            variant="text"
            color="gray"
            className="hover:bg-gray-100 rounded-lg"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-gray-600" />
          </IconButton> */}
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;