export default function notFound(req, res) {
  res.status(404);
  res.json({
    error: -2,
    descripcion: `ruta ${req.protocol}://${req.headers.host}${req.originalUrl} metodo ${req.method} no implementada`,
  });
};
