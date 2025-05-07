import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Progress,
  Avatar,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { useHomes } from "@/context/HomeContext";

export function Home() {
  const {
    users,
    isInitialized,
    fetchUsuarios,
    fetchUsuariosCount,
    isInitialcount,
    userscount,
    fetchPersonalCount,
    isInitialPersonal,
    personascount,
    fetchNovedadesCount,
    isInitialNovedades,
    novedadescount,
    countpartepersona,
    isInitialParte,
    partescount,
  } = useHomes();

  const [statisticsCardsData, setArrayCajas] = useState([]);

  useEffect(() => {
    if (!isInitialized) fetchUsuarios();
    if (!isInitialcount) fetchUsuariosCount();
    if (!isInitialPersonal) fetchPersonalCount();
    if (!isInitialNovedades) fetchNovedadesCount();
    if (!isInitialParte) countpartepersona();

    const statisticsCardsData = [
      {
        color: "gray",
        icon: BanknotesIcon,
        title: "USUARIOS DEL SISTEMA",
        value: userscount,
        footer: {
          color: "text-green-500",
          label: "Total de Usuarios Activos",
        },
      },
      {
        color: "gray",
        icon: UsersIcon,
        title: "PERSONAL MILITAR",
        value: personascount,
        footer: {
          color: "text-green-500",
          label: "Total de Personas Mindef",
        },
      },
      {
        color: "gray",
        icon: UserPlusIcon,
        title: "PERMISOS SOLICITADOS",
        value: novedadescount,
        footer: {
          color: "text-red-500",
          label: "Total de Permisos Solicitados",
        },
      },
      {
        color: "gray",
        icon: ChartBarIcon,
        title: "EFECTIVO TOTAL",
        value: partescount,
        footer: {
          color: "text-green-500",
          label: "Efectivo Total del Parte",
        },
      },
    ];

    setArrayCajas(statisticsCardsData);
  }, [
    isInitialized,
    isInitialcount,
    isInitialPersonal,
    isInitialNovedades,
    isInitialParte,
  ]);

  return (
    <div className="relative mt-12">
      {/* Marca de agua */}
      <div className="absolute inset-0 bg-[url('/img/bg-bandera.png')] bg-center bg-no-repeat bg-cover opacity-15 pointer-events-none z-0" />

      {/* Contenido */}
      <div className="relative z-10">
        {/* Cards Superiores */}
        <div className="mb-12 grid gap-y-8 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
            <StatisticsCard
              key={title}
              {...rest}
              title={title}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>&nbsp;
                  {footer.label}
                </Typography>
              }
            />
          ))}
        </div>

        {/* Tabla de Usuarios */}
        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-3 border border-gray-200 shadow-md rounded-2xl bg-white/90 backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-lg">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-8"
            >
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
                  USUARIOS DEL SISTEMA
                </Typography>
                <Typography
                  variant="small"
                  className="flex items-center gap-1 font-normal text-gray-600"
                >
                  <CheckCircleIcon
                    strokeWidth={3}
                    className="h-4 w-4 text-blue-gray-200"
                  />
                  <strong>Envio del Parte</strong>
                </Typography>
              </div>
              <Menu placement="left-start">
                <MenuHandler>
                  <IconButton size="sm" variant="text" color="blue-gray">
                    <EllipsisVerticalIcon
                      strokeWidth={3}
                      fill="currentColor"
                      className="h-6 w-6"
                    />
                  </IconButton>
                </MenuHandler>
                <MenuList>
                  <MenuItem>Actualizar</MenuItem>
                </MenuList>
              </Menu>
            </CardHeader>

            <CardBody className="overflow-x-auto px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["nombres", "repartición", "celular", "personal", "enviado"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-gray-200 bg-gray-50 py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase"
                      >
                        {el}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map(({ completo, name, nomorg, celular, personas_control, completion }, key) => {
                    const className = `py-4 px-6 ${
                      key === users.length - 1 ? "" : "border-b border-gray-200"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {/* Avatar estatico si no hay imagen */}
                            <Avatar
                              src="/img/logo-usuTable.svg"
                              alt={name}
                              size="sm"
                              variant="circular"
                              className="border border-gray-300"
                            />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {completo}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-gray-600"
                          >
                            {nomorg}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-gray-600"
                          >
                            {celular}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-gray-600"
                          >
                            {personas_control}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
