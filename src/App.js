import Form from "./components/Form";
import ListadoPersonas from "./components/ListadoPersonas";
import { useState } from "react";
import uniqid from "uniqid";

const App = () => {
  const [personas, setPersonas] = useState([
    { id: uniqid(), nombre: "Juan Roman", apellido: "Riquelmes", edad: 44 },
    { id: uniqid(), nombre: "Peter", apellido: "Parker", edad: 22 },
  ]);

  const [personaToEdit, setPersonaToEdit] = useState(null);

  const addPersonaHandler = (persona) => {
    setPersonas((prevState) => [...prevState, persona]);
  };

  const deletePersonaHandler = (id) => {
    setPersonas((prevState) =>
      prevState.filter((persona) => persona.id !== id)
    );
  };

  const startEditModeHandler = (persona) => {
    setPersonaToEdit(persona);
  };

  const stopEditModeHandler = () => {
    setPersonaToEdit(null);
  };

  const updatePersonaHandler = (id, newPersona) => {
    setPersonas((prevState) => {
      return prevState.map((persona) => {
        if (persona.id === id) {
          return { id, ...newPersona };
        }
        return persona;
      });
    });
    setPersonaToEdit(null);
  };

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
