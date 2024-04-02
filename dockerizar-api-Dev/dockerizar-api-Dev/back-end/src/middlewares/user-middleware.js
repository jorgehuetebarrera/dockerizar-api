// userMiddleware.js

// Middleware para validar los datos del usuario en la solicitud
export function validateUserData(req, res, next) {
  const { name, lastName, email, role } = req.body;

  // Verificar si todos los campos obligatorios están presentes
  if (!name || !lastName || !email || !role) {
    return res.status(400).json({ mensaje: 'Todos los campos (name, lastName, email, role) son obligatorios' });
  }

  // Verificar si el campo "role" tiene un valor válido
  if (role !== 'root' && role !== 'admin' && role !== 'normal') {
    return res.status(400).json({ mensaje: 'El valor del campo "role" debe ser "root", "admin" o "normal"' });
  }

  // Si todos los campos son válidos, continuar con el siguiente middleware
  next();
}
