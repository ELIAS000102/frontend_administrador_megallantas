import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. ELIMINAMOS LA LÍNEA 'output: "standalone"'
  // Al quitarla, volvemos a la estructura estándar que Azure entiende mejor.

  // 2. MANTENEMOS esto. Es vital para que el plan gratuito no falle.
  images: {
    unoptimized: true,
  },
  
  /* config options here */
};

export default nextConfig;