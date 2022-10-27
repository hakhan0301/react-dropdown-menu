import { useState } from "react";

function DropdownMenu() {
  const [open, setOpen] = useState<boolean>(false);

  const border = open ? 'border-2 border-blue-500' : 'border-2 border-slate-200';


  return (
    <div className={`w-96 h-12 px-4 rounded-lg bg-white  ${border} shadow hover:cursor-pointer`}
      onClick={() => setOpen(!open)}>
      <div className="flex w-full h-full items-center">
        <div className="w-full">
          {open ? 'open' : 'closed'}
        </div>

        <h1 className="text-center">{open ? '^' : 'v'}</h1>
      </div>
    </div>
  );
}

export default DropdownMenu;
