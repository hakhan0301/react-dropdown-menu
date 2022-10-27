import { useState } from "react";

function DropdownItem() {
  return (
    <button className={`w-full bg-white px-4 py-2
            first:rounded-t-lg last:rounded-b-lg
            hover:cursor-pointer hover:bg-gray-200
            text-left`}>
      <div className="">
        test
      </div>
    </button>
  )
}

function DropdownMenu() {
  const [open, setOpen] = useState<boolean>(false);

  const border = open ? 'border-2 border-blue-500' : 'border-2 border-slate-200';

  return (
    <div className="w-96">
      <button className={`w-full h-12 px-4 rounded-lg
              bg-white  ${border} shadow text-left
              hover:cursor-pointer`}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen(!open)}>
        <div className="flex h-full items-center">
          <div className="w-full">
            {open ? 'open' : 'closed'}
          </div>

          <h1 className="">{open ? '^' : 'v'}</h1>
        </div>
      </button>
      <div className={`w-96 flex flex-col absolute ${open ? '' : 'hidden'}`} role="list">
        <DropdownItem />
        <DropdownItem />
        <DropdownItem />
      </div>
    </div>
  );
}

export default DropdownMenu;
