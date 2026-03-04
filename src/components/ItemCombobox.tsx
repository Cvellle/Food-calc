'use client';

import {useEffect, useRef, useState} from 'react';

type SelectItem = {
  id: string | number;
  name: string;
  category?: string;
};

type Props = {
  items: SelectItem[];
  value: string | number | '';
  onChange: (id: string | number) => void;
  id?: string;
};

export function ItemCombobox({items, value, onChange, id}: Props) {
  const selectedItem = items.find((i) => String(i.id) === String(value));
  const [query, setQuery] = useState(selectedItem?.name ?? '');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(selectedItem?.name ?? '');
  }, [value, selectedItem?.name]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery(selectedItem?.name ?? '');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [selectedItem?.name]);

  const filtered = query
    ? items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
    : items;

  const hasCategories = items.some((i) => i.category);
  const groups: Record<string, SelectItem[]> = {};
  if (hasCategories) {
    filtered.forEach((item) => {
      const key = item.category ?? 'Other';
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
  }

  function handleSelect(item: SelectItem) {
    onChange(item.id);
    setQuery(item.name);
    setOpen(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setOpen(true);
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        autoComplete="off"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        placeholder="Search item…"
        className="h-[35px] w-full border border-gray-300 rounded px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-gray-200 rounded shadow-lg text-sm">
          {hasCategories
            ? Object.entries(groups).map(([group, groupItems]) => (
                <li key={group}>
                  <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide bg-gray-50 sticky top-0">
                    {group}
                  </div>
                  <ul>
                    {groupItems.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onMouseDown={() => handleSelect(item)}
                          className={`w-full text-left px-3 py-2 hover:bg-emerald-50 cursor-pointer ${
                            String(item.id) === String(value) ? 'bg-emerald-100 font-medium' : ''
                          }`}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            : filtered.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseDown={() => handleSelect(item)}
                    className={`w-full text-left px-3 py-2 hover:bg-emerald-50 cursor-pointer ${
                      String(item.id) === String(value) ? 'bg-emerald-100 font-medium' : ''
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
        </ul>
      )}
    </div>
  );
}
