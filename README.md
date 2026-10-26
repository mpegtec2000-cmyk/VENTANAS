# Vidriería Orellana · Landing Page & Sistema SaaS

Proyecto corporativo y panel de administración SaaS desarrollado para **Orellana - Vidrios & Aluminios** (Achupallas, Viña del Mar).

- **Slogan / Gancho:** *Calidad y Tradición*
- **Especialidad:** *Fabricación de Ventanas en Aluminio y PVC*
- **Colores:** Azul Corporativo (`#007BFF`), Azul Marino (`#0B1A2B`), Blanco y Gris Suave.
- **Tipografía:** Montserrat.

---

## 🚀 Arquitectura y Tecnologías

- **Motor:** [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Estilos:** Tailwind CSS con componentes responsivos (Móvil y Escritorio 100% testeados)
- **Iconografía:** Lucide React
- **Base de Datos & Auth:** Supabase (con capa dual: almacenamiento local persistente en Localhost + script SQL listo en `supabase/schema.sql` para cuando se conecte Supabase)
- **Despliegue futuro:** Vercel & GitHub

---

## 🛠️ Cómo Ejecutar en Localhost

El servidor de desarrollo ya se encuentra corriendo en segundo plano:

```bash
# 1. Acceder al directorio
cd "D:\PAG ORELLANA"

# 2. Iniciar servidor de desarrollo
npm run dev
```

- **Sitio Web / Landing Page:** [http://localhost:3000](http://localhost:3000)
- **Panel SaaS / Administración:** [http://localhost:3000/admin](http://localhost:3000/admin)

### Credenciales Maestras del SaaS en Localhost:
- **Correo:** `contacto@vidreria.orellana.cl`
- **Contraseña:** `orellana2026`
*(o bien `admin` / `admin` para pruebas rápidas)*

---

## 📋 Módulos del Sistema SaaS (`/admin`)

1. **Métricas & Tráfico en Tiempo Real:**
   - Total de visitas y visitantes únicos.
   - Conteo de clics en el botón **"Cotizar"**.
   - Conteo de clics hacia **WhatsApp**.
   - Tasa de conversión y desglose por dispositivo (Celular vs. Computador).
   - Feed de eventos en vivo.

2. **Catálogo & Precios:**
   - Administrador de los 9 servicios y productos extraídos de la tarjeta de presentación:
     * Ventanas en Aluminio y PVC
     * Puertas
     * Shower Door
     * Cierre de Balcón y Terrazas
     * Espejos Biselados y LED
     * Bow Window Panorámico
     * Vitrinas Comerciales
     * Celosías de Ventilación
     * Reparación en General y Otros
   - Modal para crear, editar precios (m², unidad o a cotizar), pausar o eliminar.

3. **Clientes & CRM (Leads):**
   - Recibe al instante las solicitudes del cotizador de la landing page.
   - Gestión de estados: `Nuevo`, `Contactado`, `Cotizado`, `Ganado`, `Perdido`.
   - Botón directo para responder al cliente por WhatsApp con mensaje personalizado de un solo clic.

4. **Ajustes & Supabase:**
   - Datos corporativos oficiales de Vidriería Orellana.
   - Script SQL en `supabase/schema.sql` listo para pegar en el SQL Editor de Supabase.

---

## 📞 Datos de Contacto Incorporados

- **WhatsApp / Teléfono:** `+56 9924 09397`
- **Correo:** `Contacto@Vidreria.Orellana.cl`
- **Instagram:** `@aluminios_orellana`
- **Facebook:** `Vidrios y Aluminios Orellana`
- **Dirección:** `Guillermo García Huidobro Esq. Alessandri Local 1, Achupallas - Viña del Mar`
