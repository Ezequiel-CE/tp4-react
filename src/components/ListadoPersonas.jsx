import PersonaItem from "./PersonaItem";

const ListadoPersonas = ({
  personasData,
  deletePersona,
  startEdit,
  personaToEdit,
}) => {
  if (personasData.length < 1) return <></>;

  return (
    <ul className="bg-slate-50 p-5 mt-8 rounded-lg flex flex-col gap-3 shadow-lg w-11/12 md:max-w-lg mx-auto ">
      {personasData.map((persona) => (
        <PersonaItem
          key={persona.id}
          data={persona}
          deletePersona={deletePersona}
          edit={startEdit}
          personaToEdit={personaToEdit}
        />
      ))}
    </ul>
  );
};

export default ListadoPersonas;
