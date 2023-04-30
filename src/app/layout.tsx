import type {Metadata} from "next";

import api from "~/store/api";
import StoreHeader from "~/store/components/StoreHeader";

import Providers from "./providers";

import "../globals.css";

export const metadata: Metadata = {
  title: "Tiency",
};

const App = async ({children}: {children: React.ReactNode}) => {
  const store = await api.fetch();

  return (
    <html lang="es">
      <head />
      <body>
        <Providers>
          <main className="rounded-sm max-w-screen-xl m-auto p-4">
            <article className="flex flex-col gap-8">
              <StoreHeader store={store} />
              {children}
            </article>
            <hr className="my-4" />
            {/* Inicio de copyright - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
            <p className="text-center">
              © Copyright {new Date().getFullYear()}. Hecho con ♥ para la comunidad, por{" "}
              <a href="https://gonzalopozzo.com" rel="noopener noreferrer" target="_blank">
                goncy
              </a>
              .
            </p>
            {/* Fin de copyright */}
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default App;
