import { Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { EyeFilledIcon } from "@/pages/componentes/modals/password/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/pages/componentes/modals/password/EyeSlashFilledIcon";



export function SignIn() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect para ocultar el mensaje de error después de 2 segundos
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(""); 
      }, 2000);

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [errorMessage]);

  const { handleSubmit, handleBlur, values, handleChange, errors, touched, resetForm } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Formato de correo inválido").required("El email es requerido"),
      password: Yup.string().required("La contraseña es requerida"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const success = await loginUser(values);
      setIsLoading(false);
      if (success) {
        navigate("/dashboard/home");
      } else {
        setErrorMessage("Usuario ó Contraseña Incorrectos");
      }
      resetForm();
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-10" style={{ backgroundImage: 'url(/img/FondoLogin.png)' }}>
      {/* Contenedor principal con padding */}
      <div className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-xl p-6 sm:p-10 w-full sm:max-w-4xl bg-opacity-50">
        {/* Columna del logo y eslogan */}
        <div className="sm:w-1/2 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-900 to-gray-700 rounded-t-xl sm:rounded-l-xl">
          <img src="/img/logoMinisterioLogin.png" alt="Logo" className="w-48 mb-4" />
          <Typography variant="h5" className="text-white font-semibold text-center">
            "Ministerio de Defensa"
          </Typography>
          <Typography variant="h5" className="text-white font-semibold text-center">
            "SICOMIL"
          </Typography>
          <Typography variant="small" className="text-white text-center mt-2">
            "Sistema de Control del Personal Militar"
          </Typography>
        </div>

        {/* Formulario de Login */}
        <div className="sm:w-1/2 flex flex-col justify-center p-6 sm:p-8 bg-gray-50 rounded-b-xl sm:rounded-r-xl bg-opacity-50">
          <Typography variant="h3" className="font-bold text-gray-900 text-center mb-6">Iniciar Sesión</Typography>

          {errorMessage && (
            <div className="bg-red-600 text-white p-3 rounded-lg text-center mb-4">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Typography variant="small" className="font-medium text-gray-700">Correo Electrónico</Typography>
              <Input
                size="lg"
                placeholder="correo@ejemplo.com"
                className="w-full bg-gray-200"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
                errorMessage={errors.email}
              />
            </div>

            <div>
              <Typography variant="small" className="font-medium text-gray-700">Contraseña</Typography>
              <Input
                size="lg"
                placeholder="Ingrese su contraseña"
                className="w-full bg-gray-200"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
                errorMessage={errors.password}
                type={isVisible ? "text" : "password"}
                endContent={
                  <button type="button" onClick={toggleVisibility} aria-label="Mostrar/Ocultar contraseña">
                    {isVisible ? <EyeSlashFilledIcon className="text-xl text-gray-800" /> : <EyeFilledIcon className="text-xl text-gray-400" />}
                  </button>
                }
              />
            </div>

            <Button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg text-lg shadow-md hover:bg-gray-800 transition-all" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Ingresar"}
            </Button>
          </form>

          <div className="space-y-3 mt-4">
            <Link to="#" className="flex items-center gap-2 justify-center shadow-md w-full text-gray">
              <img src="/img/LoginCon.png" height={20} width={20} alt="actuCon" />
              <span>Actualizar Contraseña</span>
            </Link>
          </div>
          <div className="space-y-3 mt-4">
            <Link to="/tutoriales" className="flex items-center gap-2 justify-center shadow-md w-full text-gray">
              <img src="/img/logoVideo.png" height={20} width={20} alt="Video" />
              <span>Ver Videos Tutoriales</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
