import type {Metadata} from "next";

import api from "~/store/api";

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
              <header className="flex flex-col gap-4">
                <img
                  alt={store.title}
                  className="rounded-lg h-full max-h-64 object-cover"
                  src={store.banner}
                />
                <div className="flex items-center flex-col sm:flex-row gap-3 sm:gap-6">
                  <div className="rounded-full -mt-12 sm:-mt-16 min-w-24 sm:min-w-32 p-1">
                    <img
                      alt={store.title}
                      className="rounded-full h-24 w-24 sm:h-32 sm:w-32"
                      src={store.logo}
                    />
                  </div>
                  <div className="flex flex-col items-center sm:items-start gap-4 text-center sm:text-left">
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-4xl">{store.title}</p>
                      <p className="text-white/50 font-medium">{store.subtitle}</p>
                    </div>
                    <div className="flex gap-2">
                      {store.instagram ? (
                        <a href={store.instagram} rel="noopener noreferrer" target="_blank">
                          <div className="flex items-center bg-teal-600 rounded-full h-10 w-10 justify-center text-white">
                            <img
                              alt="Instagram logo"
                              src="https://icongr.am/fontawesome/instagram.svg?size=24&color=ffffff"
                            />
                          </div>
                        </a>
                      ) : null}
                      {store.whatsapp ? (
                        <a href={store.whatsapp} rel="noopener noreferrer" target="_blank">
                          <div className="flex items-center bg-teal-600 rounded-full h-10 w-10 justify-center text-white">
                            <img
                              alt="Whatsapp logo"
                              src="https://icongr.am/fontawesome/whatsapp.svg?size=24&color=ffffff"
                            />
                          </div>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </header>
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
