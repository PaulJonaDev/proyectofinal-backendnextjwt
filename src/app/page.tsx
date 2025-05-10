import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Backend API con Next.js y JWT</h1>
        
        <p className={styles.description}>
          Sistema de autenticación y gestión de usuarios con roles
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Autenticación 🔐</h2>
            <p>Sistema completo de autenticación basado en JWT con roles de usuario.</p>
          </div>

          <div className={styles.card}>
            <h2>API RESTful 🚀</h2>
            <p>Endpoints seguros implementados con Next.js API Routes.</p>
          </div>

          <div className={styles.card}>
            <h2>Roles de Usuario 👥</h2>
            <p>Soporte para roles: admin, editor y usuario con permisos diferenciados.</p>
          </div>

          <div className={styles.card}>
            <h2>Seguridad 🛡️</h2>
            <p>Contraseñas encriptadas con bcrypt y validación de datos con Zod.</p>
          </div>
        </div>

        <div className={styles.endpoints}>
          <h2>Endpoints Disponibles:</h2>
          <ul>
            <li><code>POST /api/register</code> - Registro de usuarios</li>
            <li><code>POST /api/login</code> - Inicio de sesión</li>
            <li><code>GET /api/usuarios</code> - Listar usuarios (requiere rol admin)</li>
          </ul>
        </div>

        <div className={styles.ctas}>
          <Link href="/api/docs" className={styles.primary}>
            Documentación API
          </Link>
          <a 
            href="https://github.com/tuusuario/proyectofinal-backendnextjwt" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Repositorio GitHub
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Desarrollado con Next.js, MongoDB, JWT y TypeScript</p>
      </footer>
    </div>
  );
}
