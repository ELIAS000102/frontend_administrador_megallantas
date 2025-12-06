// src/service/authService.js

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const handleResponseError = (res, data) => {
  if (res.status === 429) {
    return data.message || 'Has intentado demasiadas veces. Por seguridad, espera 15 minutos.';
  }
  if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors[0].msg;
  }
  return data.error || 'Ocurrió un error inesperado';
};

export const login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: handleResponseError(res, data) };
    }
    return { success: true, data: data.usuario };
  } catch (err) {
    console.error('Error login:', err);
    return { success: false, error: 'No se pudo conectar al servidor.' };
  }
};

export const register = async (name, email, password) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }), 
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: handleResponseError(res, data) };
    }
    return { success: true, data: data };
  } catch (err) {
    return { success: false, error: 'No se pudo conectar al servidor.' };
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include', 
    });
    if (!res.ok) {
      return { success: false, error: 'Error al cerrar sesión' };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Error de conexión' };
  }
};

