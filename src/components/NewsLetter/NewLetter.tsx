import React from "react";
import Button from "../Inputs/Button/Button";
import InputText from "../Inputs/InputText/InputText";

function NewsLetter() {
  /**
   * Metodo post que enviara informacion, probablemete un correo para inscribir
   * dicho correo a la suscribcion de la pagina
   *
   * NOTA: Falta validar si habra una respuesta por ejemplo que diga si el correo
   * ya esta registrado o algun mensaje en especifico.
   */
  const suscribeNewsLetter = (event: React.FormEvent<HTMLFormElement>) => {
    let params = event.target;
  };

  const [email, setEmail] = React.useState<string>("");

  return (
    <form
      className=" container mr-3 mt-10 w-full flex flex-col  "
      onSubmit={suscribeNewsLetter}
    >
      <div className="flex flex-col  mb-6">
        <h1 className=" flex font-bold text-3xl hover:font-bold text-yellow-400 dark:text-yellow-400">
          Joins our Newsletter
        </h1>
        <h2 className="flex dark:text-white">
          get Weekly access to our best deals, tips and tricks
        </h2>
      </div>

      <div className="mb-6 flex flex-col items-start justify-around">
        <div className="w-full flex justify-between">
          <InputText
            value={email}
            setValue={setEmail}
            type={"email"}
            placeHolder={"janedoe@apexsystems.com"}
            classNameContainer={`flex w-4/5 items center mt-4`}
            customClassInput={`w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 mr-3 p-2.5 bg-transparent dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          />
          <div className="flex flex-col w-3/7 items-center justify-center">
            <Button
              type="submit"
              label="Join"
              customClass={`flex w-full items-center justify-center bg-yellow-500`}
            />
          </div>
        </div>
        <h5 className="text-gray-300 ">
          No spam, we hate it more thatn you do!
        </h5>
      </div>
    </form>
  );
}

export default NewsLetter;
