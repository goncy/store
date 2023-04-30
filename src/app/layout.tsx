import api from "~/store/api";
import StoreHeader from "~/store/components/StoreHeader";
import Providers from "./providers";

import "../globals.css"

type Props = {
  children: React.ReactNode
}

const App = async ({children}: Props) => {
  const store = await api.fetch()

  return (
    <html>
      <head />
      <body>
        <Providers>
          <main className="bg-white rounded-sm max-w-screen-xl m-auto p-4">
            <article className="flex flex-col gap-8">
              <StoreHeader store={store} />
              {children}
            </article>
            <hr className="border-gray-200 my-4" />
            {/* Inicio de copyright - Cambiar el contenido de los mismos viola el contenido de los terminos de licencia */}
            <p className="text-center">
              © Copyright {new Date().getFullYear()}. Hecho con ♥ para la comunidad, por{" "}
              <a rel="noopener noreferrer" target="_blank" href="https://gonzalopozzo.com">
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
