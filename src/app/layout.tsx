import type {Metadata} from "next";

import api from "~/store/api";
import WhatsappIcon from "~/ui/components/icons/whatsapp";
import InstagramIcon from "~/ui/components/icons/instagram";

import Providers from "./_components/providers";
import {ThemeToggle} from "./_components/theme-toggle";

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
          <main className="m-auto max-w-screen-xl rounded-sm p-4">
            <article className="flex flex-col gap-4">
              <header className="flex flex-col gap-4">
                <img
                  alt={store.title}
                  className="h-32 rounded-lg object-cover sm:h-64"
                  src={store.banner}
                />
                <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
                  <div className="-mt-20 rounded-full p-1 sm:-mt-16">
                    <img
                      alt={store.title}
                      className="h-32 w-32 rounded-full border-8"
                      src={store.logo}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:gap-2 sm:text-left">
                    <div className="flex flex-col gap-1">
                      <p className="text-3xl font-bold sm:text-4xl">{store.title}</p>
                      <p className="text-muted-foreground font-medium">{store.subtitle}</p>
                    </div>
                    <div className="flex gap-2">
                      {store.instagram ? (
                        <a href={store.instagram} rel="noopener noreferrer" target="_blank">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white">
                            <InstagramIcon />
                          </div>
                        </a>
                      ) : null}
                      {store.whatsapp ? (
                        <a href={store.whatsapp} rel="noopener noreferrer" target="_blank">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white">
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
            <p className="sm:text-md text-muted-foreground text-center text-sm">
              © Copyright {new Date().getFullYear()}. Hecho con <ThemeToggle /> y Next.js, por{" "}
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
