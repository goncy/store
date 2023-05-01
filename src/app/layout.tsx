import type {Metadata} from "next";

import api from "~/store/api";
import WhatsappIcon from "~/ui/components/icons/whatsapp";
import InstagramIcon from "~/ui/components/icons/instagram";

import Providers from "./providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Tiency",
  description: "Tienda de prueba hecha con Next.js 13 y app directory por Goncy",
  themeColor: "#ffffff",
};

const App = async ({children}: {children: React.ReactNode}) => {
  const store = await api.fetch();

  return (
    <html lang="es">
      <head />
      <body>
        <Providers>
          <main className="rounded-sm max-w-screen-xl m-auto p-4">
            <article className="flex flex-col gap-4">
              <header className="flex flex-col gap-4">
                <img
                  alt={store.title}
                  className="rounded-lg h-32 sm:h-64 object-cover"
                  src={store.banner}
                />
                <div className="flex items-center flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="rounded-full -mt-20 sm:-mt-16 min-w-24 sm:min-w-32 p-1">
                    <img
                      alt={store.title}
                      className="rounded-full h-32 w-32 shadow border-8 border-background"
                      src={store.logo}
                    />
                  </div>
                  <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-2 text-center sm:text-left">
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-3xl sm:text-4xl">{store.title}</p>
                      <p className="text-muted-foreground font-medium">{store.subtitle}</p>
                    </div>
                    <div className="flex gap-2">
                      {store.instagram ? (
                        <a href={store.instagram} rel="noopener noreferrer" target="_blank">
                          <div className="flex items-center bg-teal-600 rounded-full h-10 w-10 justify-center text-white">
                            <InstagramIcon />
                          </div>
                        </a>
                      ) : null}
                      {store.whatsapp ? (
                        <a href={store.whatsapp} rel="noopener noreferrer" target="_blank">
                          <div className="flex items-center bg-teal-600 rounded-full h-10 w-10 justify-center text-white">
                            <WhatsappIcon />
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
            <p className="text-center text-sm sm:text-md text-muted-foreground">
              © Copyright {new Date().getFullYear()}. Hecho con ❤ y Next.js, por{" "}
              <a
                className="underline"
                href="https://twitter.com/goncy"
                rel="noopener noreferrer"
                target="_blank"
              >
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
