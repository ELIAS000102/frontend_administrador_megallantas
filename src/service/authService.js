// La URL de tu API de Express (desde el .env.local)
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Llama al endpoint de login del backend.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      // ¡Crucial! Permite que el navegador envíe la cookie HttpOnly
      credentials: 'include', 
    });

    const data = await res.json();

    if (!res.ok) {
      // Retornamos un objeto de error estandarizado
      return { success: false, error: data.error || 'Error al iniciar sesión' };
    }
    
    // Retornamos un objeto de éxito
    return { success: true, data: data.usuario };
  } catch (err) {
    console.error('Error de conexión:', err);
    return { success: false, error: 'No se pudo conectar al servidor' };
  }
};

/**
 * Llama al endpoint de registro del backend.
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const register = async (name, email, password) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Enviamos el 'name' que recolecta tu formulario
      body: JSON.stringify({ name, email, password }), 
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || 'Error al registrar' };
    }

    return { success: true, data: data };
  } catch (err) {
    console.error('Error de conexión:', err);
    return { success: false, error: 'No se pudo conectar al servidor' };
  }
};

/**
 * Llama al endpoint de logout del backend.
 */
export const logout = async () => {
  try {
    const res = await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      // 'credentials: include' es necesario para que el backend
      // reciba la solicitud de un usuario autenticado.
      credentials: 'include', 
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || 'Error al cerrar sesión' };
    }
    
    return { success: true };
  } catch (err) {
    console.error('Error de conexión:', err);
    return { success: false, error: 'No se pudo conectar al servidor' };
  }
};