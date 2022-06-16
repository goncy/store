[![codecov](https://codecov.io/gh/goncy/commercency/branch/main/graph/badge.svg?token=XiTcCI2c18)](https://codecov.io/gh/goncy/commercency)

---

# Commercency
Ecommerce, simple.

## Como la uso?
1. Crea una copia de [esta planilla de calculo](https://docs.google.com/spreadsheets/d/1Q_mDN1w88zE1vDasru-f3D6kxZAynUC1s253yLmjE7M/edit?usp=sharing).
2. Una vez copiada, toca en `Archivo > Publicar en la web`, selecciona `Valores separados por comas (.csv)` del desplegable y clickea en `publicar`.
3. Asegurate que en vez de `Pagina web` diga `Valores separados por comas (.csv)` y copia el enlace.
4. Pega el enlace en [este archivo](./app/constants.ts) y completa los datos de tu tienda. `crear "app/constants.ts" y agregar el código: `
```
export const INFORMATION = {
  avatar: "/assets/avatar.jpg",
  banner: "/assets/banner.jpg",
  title: "La tiendita de Alex",
  description: "Casi tan barato como la competencia",
  phone: `51979336360`,
  sheet: `https://docs.google.com/spreadsheets/d/e/2PACX-1vQFMFc2wKNZrHLbC52jMiwySViLM9BgjlDihvPq7P5BBrgC6DHkUJ33UStpA11CycNRELgTUE1Jkg7c/pub?output=csv`,
  color: `teal`,
  social: [
    {
      name: "instagram",
      url: `#`,
    },
    {
      name: "whatsapp",
      url: `https://wa.me/51979336360`,
    },
  ],
};
```

5. Publica el sitio en [algun hosting que soporte NextJS](https://vercel.com)

# TODO
* Revisar si deberia traer los fields como un Record<string, string> o como un array.
* Revisar si CartDrawer deberia ser un solo componente o dividirlo mas
* Si no tengo fields, el componente de Details debería mostrarme el botón de completar pedido
* Datos de tienda vía hoja de sheet
* Búsqueda
* Secciones por categoría
