import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

const PersonaItem = ({ data, deletePersona, edit, personaToEdit }) => {
  const { id, nombre, apellido, edad } = data;

  const onClickDeleteHandler = () => {
    deletePersona(id);
  };

  const onClickEditHandler = () => {
    edit(data);
  };

  return (
    <li className="bg-slate-300 p-5 w-full  rounded-lg flex justify-between items-center shadow-lg ">
      <div>
        <p className="text-black text-sm font-bold">{`Nombre: ${nombre}`}</p>
        <p className="text-black text-sm font-bold">{`Apellido: ${apellido}`}</p>
        <p className="text-black text-sm font-bold">{`Edad: ${edad}`}</p>
      </div>

      <div className="flex gap-3">
        {!personaToEdit && (
          <>
            <AiOutlineEdit
              className="w-5 h-5 hover:cursor-pointer"
              onClick={onClickEditHandler}
            />
            <AiFillDelete
              className="w-5 h-5 hover:cursor-pointer"
              onClick={onClickDeleteHandler}
            />
          </>
        )}
      </div>
    </li>
  );
};

export default PersonaItem;
