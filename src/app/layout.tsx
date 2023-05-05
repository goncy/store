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
        <div className="m-auto max-w-screen-xl rounded-sm">
          <Providers>
            <header className="mb-4 flex flex-col gap-4 px-4 pt-4 sm:mb-8">
              <img
                alt={store.title}
                className="h-32 rounded-lg object-cover sm:h-64"
                src={store.banner}
              />
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
                <div className="-mt-20 rounded-full p-1 sm:-mt-16">
                  <img
                    alt={store.title}
                    className="h-32 w-32 rounded-full border-8 border-background"
                    src={store.logo}
                  />
                </div>
                <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:gap-2 sm:text-left">
                  <div className="flex flex-col gap-1">
                    <p className="text-3xl font-bold sm:text-4xl">{store.title}</p>
                    <p className="font-medium text-muted-foreground">{store.subtitle}</p>
                  </div>
                  <div className="flex gap-2">
                    {store.instagram ? (
                      <a
                        aria-label="Instagram"
                        href={store.instagram}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white">
                          <InstagramIcon />
                        </div>
                      </a>
                    ) : null}
                    {store.whatsapp ? (
                      <a
                        aria-label="Whatsapp"
                        href={store.whatsapp}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white">
                          <WhatsappIcon />
                        </div>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </header>
            <main className="px-4">{children}</main>
            <footer className="mt-4 px-4 sm:mt-8">
              {/* Inicio de copyright - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
              <p className="sm:text-md border-t py-4 text-center text-sm text-muted-foreground">
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
            </footer>
          </Providers>
        </div>
      </body>
    </html>
  );
};

export default App;
