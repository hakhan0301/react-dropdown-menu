
import { Key, PropsWithoutRef, useRef } from 'react';
import { useEffect } from 'react';
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
        hover:cursor-pointer hover:bg-gray-200
        text-left`}
      onMouseDown={onSelect}
    >
      {multiselect && <div className='rounded-sm w-4 h-4 border-2 text-xs text-center'>
        {selected && "✔️"}
      </div>}
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

const ITEMS_PER_PAGE = 20;
const DropdownMenu = ({ options, multiselect }: PropsWithoutRef<DropdownMenuProps>) => {
  const [open, setOpen] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const slicedOptions = useMemo(
    () => options.slice(0, (currentPage + 1) * ITEMS_PER_PAGE),
    [currentPage, options]
  );

  const selectedIndices = useMemo(() => new Set<number>(), []);
  const selectedOptions = useMemo(
    () => Array.from(selectedIndices).map(index => options[index])
    , [selectedIndices.entries(), options]
  );

  const [showClearButton, setShowClearButton] = useState<boolean>(false);
  useEffect(() => setShowClearButton(selectedIndices.size > 0), [selectedIndices.size]);

  const itemsListRef = useRef();
  const onDropdownScroll = () => {
    // referenced from https://blog.saeloun.com/2022/07/08/react-custom-infinite-scroll-with-pagination.html
    if (itemsListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = itemsListRef.current;

      if (scrollTop + clientHeight === scrollHeight) {
        setCurrentPage(currentPage + 1);
      }
    }
  }

  // console.log(currentPage);


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

  const dropdownItems = useMemo(() => slicedOptions.map(
    (option, index) => <DropdownItem text={option}
      selected={selectedIndices.has(index)}
      multiselect={multiselect}
      key={option as Key}
      onSelect={() => onOptionSelected(index)}
    />
  ), [slicedOptions, selectedIndices.entries()]);

  const border = open ? 'border-2 border-blue-500' : 'border-2 border-slate-200';
  return (
    <div className="w-96 relative">
      {/* menu */}
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

      {/* clear button */}
      {showClearButton && <button className='absolute right-8 top-[25%]'
        onClick={() => { selectedIndices.clear(); setShowClearButton(false); }}>
        x
      </button>}

      {/* items list */}
      <div className={`w-96 flex flex-col absolute max-h-60 rounded-l-lg overflow-y-auto z-10 ${open ? '' : 'hidden'}`}
        role="list"
        onScroll={onDropdownScroll}
        ref={itemsListRef as any}
      >
        {dropdownItems}
      </div>
    </div>
  );
}

export default DropdownMenu;
