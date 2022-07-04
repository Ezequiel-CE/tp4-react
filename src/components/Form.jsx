import { useState, useEffect } from "react";
import uniqid from "uniqid";

const Form = ({ addPersona, personaToEdit, stopEdit, updatePersona }) => {
  const [inputs, setInputs] = useState({ nombre: "", apellido: "", edad: "" });
  const { nombre, apellido, edad } = inputs;

  const cleanInputs = () => {
    setInputs({ nombre: "", apellido: "", edad: "" });
  };

  //accion de input

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  //accion de botones

  const addPersonaOnClick = (e) => {
    e.preventDefault();
    if (nombre === "" || apellido === "" || edad === "") {
      window.alert("Rellena todo el formulario");
      return;
    }
    addPersona({ id: uniqid(), nombre, apellido, edad });
    cleanInputs();
  };

  const onCancelEditHandler = (e) => {
    e.preventDefault();
    stopEdit();
    cleanInputs();
  };

  const onAcceptEditHandler = (e) => {
    e.preventDefault();
    if (nombre === "" || apellido === "" || edad === "") {
      window.alert("Formulario no puede estar vacio");
      return;
    }
    updatePersona(personaToEdit.id, inputs);
    cleanInputs();
  };

  //cuando entramos en modo de editar cambia los inputs

  useEffect(() => {
    if (personaToEdit) {
      console.log("cambia");
      setInputs({
        nombre: personaToEdit.nombre,
        apellido: personaToEdit.apellido,
        edad: personaToEdit.edad,
      });
    }
  }, [personaToEdit]);

  return (
    <form className="bg-slate-50 p-5 rounded-lg flex flex-col gap-3 shadow-lg w-11/12 md:max-w-lg mx-auto ">
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="nombre"
        >
          Nombre
        </label>
        <input
          className="shadow  border rounded w-full py-2 px-3 text-gray-700  focus:outline focus:shadow-outline"
          name="nombre"
          type="text"
          placeholder="Nombre de la persona"
          onChange={onChangeHandler}
          value={nombre}
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="apellido"
        >
          Apellido
        </label>
        <input
          className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:shadow-outline"
          name="apellido"
          type="text"
          placeholder="Apellido de la persona"
          onChange={onChangeHandler}
          value={apellido}
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="edad"
        >
          Edad
        </label>
        <input
          className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:shadow-outline"
          name="edad"
          type="number"
          placeholder="Edad de la persona"
          onChange={onChangeHandler}
          value={edad}
        />
      </div>
      <div className="flex items-center justify-center py-3 gap-3">
        {personaToEdit ? (
          <>
            <button
              className="bg-slate-300 hover:bg-slate-500 text-black font-bold py-2 px-4 rounded-full  "
              type="submit"
              onClick={onAcceptEditHandler}
            >
              Aceptar
            </button>
            <button
              className="bg-slate-300 hover:bg-slate-500 text-black font-bold py-2 px-4 rounded-full  "
              type="submit"
              onClick={onCancelEditHandler}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            className="bg-slate-300 hover:bg-slate-500 text-black font-bold py-2 px-4 rounded-full border focus:outline-1 focus:shadow-outline"
            type="submit"
            onClick={addPersonaOnClick}
          >
            Agregar
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
