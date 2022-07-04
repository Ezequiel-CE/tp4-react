import Form from "./components/Form";
import ListadoPersonas from "./components/ListadoPersonas";
import { useEffect, useState } from "react";

const App = () => {
  const [personas, setPersonas] = useState([]);

  const [personaToEdit, setPersonaToEdit] = useState(null);

  const addPersonaHandler = async (persona) => {
    try {
      const response = await fetch("http://localhost:4000/personas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(persona),
      });

      if (!response.ok) throw new Error();

      const nuevaTarea = await response.json();

      setPersonas((prevState) => [...prevState, nuevaTarea]);
    } catch (error) {
      console.log("no se puedo agregar persona");
    }
  };

  const deletePersonaHandler = async (id) => {
    if (!window.confirm("¿Desea eliminar la tarea?")) return;

    try {
      const response = await fetch("http://localhost:4000/personas/" + id, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();

      setPersonas((prevState) => prevState.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.log("no se puedo borrar persona");
    }
  };

  const startEditModeHandler = (persona) => {
    setPersonaToEdit(persona);
  };

  const stopEditModeHandler = () => {
    setPersonaToEdit(null);
  };

  const updatePersonaHandler = async (id, newPersona) => {
    try {
      const response = await fetch("http://localhost:4000/personas/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPersona),
      });
      if (!response.ok) throw new Error();

      setPersonas((prevState) => {
        return prevState.map((persona) => {
          if (persona.id === id) {
            return { id, ...newPersona };
          }
          return persona;
        });
      });
      setPersonaToEdit(null);
    } catch (error) {
      console.log("no se pudo actualizar persona");
    }
  };

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await fetch("http://localhost:4000/personas");
        if (!response.ok) throw new Error();

        const personasData = await response.json();
        setPersonas(personasData);
      } catch (error) {
        console.log("no se puedo cargar las personas");
      }
    };

    fetchPersonas();
  }, []);

  return (
    <div className="min-h-screen bg-cyan-400  ">
      <h1 className="text-center mb-12 font-bold leading-tight text-4xl bg-slate-50 p-6  shadow-lg md:text-5xl text-gray-700  ">
        Libreta de Personas
      </h1>
      <Form
        addPersona={addPersonaHandler}
        stopEdit={stopEditModeHandler}
        personaToEdit={personaToEdit}
        updatePersona={updatePersonaHandler}
      />
      <ListadoPersonas
        personasData={personas}
        deletePersona={deletePersonaHandler}
        startEdit={startEditModeHandler}
        personaToEdit={personaToEdit}
      />
    </div>
  );
};

export default App;
