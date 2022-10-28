
import type { Key, PropsWithoutRef } from 'react';
import { useMemo } from 'react';
import { useState } from "react";


type DropdownItemProps = {
  text: String,
  multiselect?: boolean,
  selected?: boolean,
  onSelect: () => void
}
function DropdownItem({ text, onSelect, multiselect, selected }: PropsWithoutRef<DropdownItemProps>) {
  return (
    <button className={`w-full bg-white px-4 py-2
        flex gap-2 items-center
        first:rounded-t-lg last:rounded-b-lg
        hover:cursor-pointer hover:bg-gray-200
        text-left`}
      onMouseDown={onSelect}
    >
      {
        multiselect && <div className='rounded-sm w-4 h-4 border-2 text-xs text-center'>
          {selected && "x"}
        </div>
      }
      <div className="">
        {text}
      </div>
    </button>
  )
}

export type DropdownMenuProps = {
  options: String[],
  multiselect?: boolean
}


const DropdownMenu = ({ options, multiselect }: PropsWithoutRef<DropdownMenuProps>) => {
  const [open, setOpen] = useState<boolean>(false);

  const selectedIndices = useMemo(() => new Set<number>(), []);
  const selectedOptions = useMemo(
    () => Array.from(selectedIndices).map(index => options[index])
    , [selectedIndices.entries(), options]
  );


  const onOptionSelected = (index: number) => {
    if (selectedIndices.has(index)) {
      selectedIndices.delete(index);
    } else {
      if (!multiselect) {
        selectedIndices.clear();
      }
      selectedIndices.add(index);
    }
  }

  const dropdownItems = useMemo(() => options.map(
    (option, index) => <DropdownItem text={option}
      selected={selectedIndices.has(index)}
      multiselect={multiselect}
      key={option as Key}
      onSelect={() => onOptionSelected(index)}
    />
  ), [options, selectedIndices.entries()]);

  const border = open ? 'border-2 border-blue-500' : 'border-2 border-slate-200';
  return (
    <div className="w-96">
      <button className={`w-full h-12 px-4 rounded-lg
              bg-white  ${border} shadow text-left
              hover:cursor-pointer`}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen(!open)}>
        <div className="flex h-full items-center gap-2">
          <div className="w-full">
            {selectedOptions.join(", ")}
          </div>

          <h1 className="">{open ? '^' : 'v'}</h1>
        </div>
      </button>
      <div className={`w-96 flex flex-col absolute ${open ? '' : 'hidden'}`} role="list">
        {dropdownItems}
      </div>
    </div>
  );
}

export default DropdownMenu;
