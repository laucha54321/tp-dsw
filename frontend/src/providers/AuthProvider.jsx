import { useState } from "react";
import { AuthContext } from '../contexts/auth';
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../helpers/api";

function isExpired(expiration) {
  return Date.now() / 1000 > expiration;
}

function getUser(jwt) {
  if (!jwt) {
    return null;
  }
  try {
    const decoded = jwtDecode(jwt);

    if (isExpired(decoded.exp)) {
      return null;
    }
    return {
      id: decoded.id,
      paciente: decoded.paciente,
      role: decoded.role,
      email: decoded.email,
    };
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser(localStorage.getItem("token")));
  const [wasAuthenticated, setWasAuthenticated] = useState(false);
  const [errorLogin, setErrorLogin] = useState(null);

  const isAuthenticated = () => {
    return !!getUser(localStorage.getItem('token'))
  }

  // Demo users (hardcoded)
  const demoUsers = [
    {
      id: 1,
      email: "demo@mail.com",
      password: "demo123",
      role: "user",
      paciente: { nombre: "Demo", apellido: "User", dni: "12345678" }
    },
    {
      id: 2,
      email: "admin@mail.com",
      password: "admin123",
      role: "admin",
      paciente: { nombre: "Admin", apellido: "User", dni: "87654321" }
    }
  ];

  // Simulate JWT creation
  function createFakeJWT(user) {
    const payload = {
      id: user.id,
      paciente: user.paciente,
      role: user.role,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1 hour expiry
    };
    // Simple base64 encoding (not secure, just for demo)
    return btoa(JSON.stringify(payload));
  }

  const login = async (userData) => {
    setErrorLogin(null);
    // Find user in demoUsers
    const found = demoUsers.find(
      u => u.email === userData.email && u.password === userData.contraseña
    );
    if (found) {
      const fakeToken = createFakeJWT(found);
      localStorage.setItem("token", fakeToken);
      setUser(getUser(fakeToken));
      setWasAuthenticated(true);
    } else {
      setErrorLogin("Email o contraseña incorrectos (demo)");
      throw new Error("Email o contraseña incorrectos (demo)");
    }
  };

  const regist = async (userData) => {
    setErrorLogin(null);
    const userPatientData = {
    email: userData.email,
    contraseña: userData.contraseña,
    role: "user",
    paciente: {
      nombre: userData.nombre,
      apellido: userData.apellido,
      dni: userData.dni,
      telefono: userData.telefono,
      direccion: userData.domicilio,
      fechaNacimiento: userData.fechaNacimiento
    },
    }
    try {
      const response = await axiosInstance.post(
        "/usuario",
        userPatientData
      );
      localStorage.setItem("token", response.data.token);
      setUser(getUser(response.data.token));
      setWasAuthenticated(true);
      alert("Usuario creado Correctamente!");
      await login(userPatientData);
    } catch (error) {
        console.error("Error en AuthProvider:", error);
        if (error.response && error.response.data && error.response.data.message) {
            setErrorLogin(error.response.data.message);
        } else {
            setErrorLogin("Error de red o del servidor. Por favor, inténtalo de nuevo.");
        }
         throw error;
    }
  };

   const modify = async (userData) => {
    setErrorLogin(null);
    const usuarioData = 
    {
    id:userData.id,
    email: userData.email,
    contraseña: userData.contraseña,
    paciente: userData.paciente.id
    };
    const pacienteData= 
    {
      nombre: userData.paciente.nombre,
      apellido: userData.paciente.apellido,
      dni: userData.paciente.dni,
      telefono: userData.paciente.telefono,
      direccion: userData.paciente.direccion,
      fechaNacimiento: userData.paciente.fechaNacimiento
    };
    try {
      const routePaciente = "/paciente/"+usuarioData.paciente;
      await axiosInstance.put(
        routePaciente,
        pacienteData
      );
      const routeUsuario = "/usuario/"+usuarioData.id;
      const response = await axiosInstance.put(
        routeUsuario,
        usuarioData
      );
      localStorage.setItem("token", response.data.token);
      setUser(getUser(response.data.token));
      setWasAuthenticated(true);
      alert("Usuario modificado Correctamente!");
    } catch (error) {
        console.error("Error en AuthProvider:", error);
        if (error.response && error.response.data && error.response.data.message) {
            setErrorLogin(error.response.data.message);
        } else {
            setErrorLogin("Error de red o del servidor. Por favor, inténtalo de nuevo.");
        }
         throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const authValue = {
    isAuthenticated,
    user,
    login,
    modify,
    regist,
    logout,
    wasAuthenticated,
    errorLogin,
  };


  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
