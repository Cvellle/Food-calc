'use client';

import {useState, useRef, useEffect} from 'react';
import Link from 'next/link'; // Next.js Link without legacyBehavior
import LocaleSwitcher from './LocaleSwitcher';

type NavLink = {
  type: 'link';
  label: string;
  href: string;
};

type NavDropdown = {
  type: 'dropdown';
  label: string;
  items: {
    label: string;
    href: string;
    description: string;
  }[];
};

export type NavItem = NavLink | NavDropdown;

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Meals',
    type: 'dropdown',
    items: [
      {label: 'All meals', description: 'See all meals', href: '/meals'},
      {
        label: 'Create meal',
        description: 'Create a new meal',
        href: '/meals/create'
      }
    ]
  },
  {label: 'About', type: 'link', href: '/about'},
  {label: 'Contact', type: 'link', href: '/contact'},
  {label: 'Blog', type: 'link', href: '/blog'}
];

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggle = (key: string) =>
    setOpen((prev) => (prev === key ? null : key));

  return (
    <div ref={containerRef} className="w-full border-b bg-white">
      <nav className="flex justify-between max-w-6xl mx-auto px-4 py-4 items-center gap-6 relative">
        {/* Logo */}
        <div className="font-bold text-xl">Food calc</div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative">
              {item.type === 'link' && (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 transition"
                >
                  {item.label}
                </Link>
              )}

              {item.type === 'dropdown' && (
                <>
                  <button
                    onClick={() => toggle(item.label)}
                    className="hover:text-blue-600 transition"
                  >
                    {item.label}
                  </button>

                  {open === item.label && (
                    <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border rounded-xl p-4 w-64 z-20">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block py-2 hover:bg-gray-100 rounded-lg px-2"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          <LocaleSwitcher />
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className="md:hidden ml-auto text-2xl"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="absolute top-full left-0 w-full bg-white border md:hidden p-4 z-30">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="mb-4">
                {item.type === 'link' && (
                  <Link
                    href={item.href}
                    className="block py-2 text-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}

                {item.type === 'dropdown' && (
                  <>
                    <button
                      onClick={() => toggle(item.label)}
                      className="block py-2 text-lg font-medium w-full text-left"
                    >
                      {item.label}
                    </button>

                    {open === item.label && (
                      <div className="ml-4 mt-1">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block py-1 text-gray-700"
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            <LocaleSwitcher />
          </div>
        )}
      </nav>
    </div>
  );
}
