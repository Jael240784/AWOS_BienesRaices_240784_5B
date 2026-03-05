export function generarToken(longitud = 26) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < longitud; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}