[![codecov](https://codecov.io/gh/goncy/commercency/branch/main/graph/badge.svg?token=XiTcCI2c18)](https://codecov.io/gh/goncy/commercency)

---

# Commercency
Ecommerce, simple.

## Como la uso?
1. Crea una copia de [esta planilla de calculo](https://docs.google.com/spreadsheets/d/1Q_mDN1w88zE1vDasru-f3D6kxZAynUC1s253yLmjE7M/edit?usp=sharing).
2. Una vez copiada, toca en `Archivo > Publicar en la web`, selecciona `Valores separados por comas (.csv)` del desplegable y clickea en `publicar`.
3. Asegurate que en vez de `Pagina web` diga `Valores separados por comas (.csv)` y copia el enlace.
4. Llena [este archivo](./.env.example) y completa los datos de tu tienda y renombralo a `.env.local`.
5. Publica el sitio en [algun hosting que soporte NextJS](https://vercel.com)

# TODO
* Revisar si deberia traer los fields como un Record<string, string> o como un array.
* Revisar si CartDrawer deberia ser un solo componente o dividirlo mas
* Si no tengo fields, el componente de Details debería mostrarme el botón de completar pedido
* Datos de tienda vía hoja de sheet
* Búsqueda
* Secciones por categoría
