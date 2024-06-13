

// Middleware para validar los datos del usuario en la solicitud
export function validateUserData(req, res, next) {
  const { name, lastName, email, role } = req.body;

  // Verificar si todos los campos obligatorios están presentes
  if (!name || !lastName || !email || !role) {
    return res.status(400).json({ mensaje: 'Todos los campos (name, lastName, email, role) son obligatorios' });
  }


  // Si todos los campos son válidos, continuar con el siguiente middleware
  next();
}
