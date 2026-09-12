[![codecov](https://codecov.io/gh/goncy/commercency/branch/main/graph/badge.svg?token=XiTcCI2c18)](https://codecov.io/gh/goncy/commercency)

---

# Commercency
Ecommerce, simple.

## Desarrollo

Requiere Node.js 24 o superior y pnpm 12. Ejecutá `pnpm install` y `pnpm dev`.
`pnpm typecheck` genera los tipos de Next.js y ejecuta TypeScript 7. El alias
`typescript` conserva la API de TypeScript 6 para las herramientas que la necesitan.

Para usar datos de ejemplo, configurá `USE_MOCKS=true` en `.env.local`. Los métodos
habituales de las APIs cargan los archivos `mocks/default.json` de productos,
tienda y campos del carrito, sin necesitar las URLs de las planillas. Si la variable
no está definida o vale `false`, usan `PRODUCTS`, `STORE` y `FIELDS`.
Reiniciá `pnpm dev` al cambiarla; en producción, volvé a ejecutar `pnpm build`
con el valor deseado para regenerar los datos prerenderizados.

## Validación

- `pnpm test`: Vitest y React Testing Library. Cobertura con `pnpm test -- --coverage`.
- `pnpm integration`: Playwright en escritorio y móvil. Los flujos de tienda usan
  el build de producción; las pruebas con `instant()` usan `next dev`.
  Instalar Chromium una vez con `pnpm exec playwright install chromium`.
  Usa `USE_MOCKS=true` para cargar los mismos JSON de ejemplo de la aplicación,
  sin configurar planillas ni levantar un servidor de fixtures.
  La suite usa datos estáticos: no cubre cambios de precio ni productos agregados
  después del build.
- `pnpm lint` y `pnpm typecheck`.

## Caché

Cache Components está habilitado. Productos, tienda y campos usan `use cache`,
`cacheLife("max")` y etiquetas. `/refresh?secret=...` invalida las etiquetas
con revalidación en segundo plano. El catálogo y los productos conocidos se
prerenderizan; los productos inexistentes muestran 404.
Para productos agregados después de compilar, el catálogo se muestra antes de que
termine de cargar el detalle del producto.

La configuración y los comandos de las pruebas de navegación están en
[instant-nav.rig.md](./instant-nav.rig.md).

## Como la uso?
1. Crea una copia de [esta planilla de calculo](https://docs.google.com/spreadsheets/d/1Q_mDN1w88zE1vDasru-f3D6kxZAynUC1s253yLmjE7M/edit?usp=sharing).
2. Una vez copiada, toca en `Archivo > Publicar en la web`, selecciona `Valores separados por comas (.csv)` del desplegable y clickea en `publicar`.
3. Asegurate que en vez de `Pagina web` diga `Valores separados por comas (.csv)` y copia el enlace.
4. Llena [este archivo](./.env.example) y completa los datos de tu tienda y renombralo a `.env.local`.
5. Publica el sitio en [algun hosting que soporte NextJS](https://vercel.com)

## Estilos

El proyecto usa Tailwind CSS 4 con `@tailwindcss/postcss`. Los colores, fuentes,
radios, animaciones y el contenedor se configuran en `src/app/globals.css`.
La paleta `brand` usa los tonos `teal` de Tailwind. Para cambiarla, editá las
variables `--color-brand-*` en ese CSS; la variable de entorno `COLOR` ya no se usa.
Las animaciones de los diálogos usan `tw-animate-css`.
Los componentes de shadcn usan Base UI, con el estilo `base-nova` y `cn` para combinar clases.

# TODO
* Revisar si deberia traer los fields como un Record<string, string> o como un array.
* Revisar si CartDrawer deberia ser un solo componente o dividirlo mas
* Si no tengo fields, el componente de Details debería mostrarme el botón de completar pedido
* Datos de tienda vía hoja de sheet
* Búsqueda
* Secciones por categoría
