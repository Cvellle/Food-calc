'use client';

import {useState, useRef, useEffect} from 'react';
import Link from 'next/link';
import LocaleSwitcher from './LocaleSwitcher';
import {useTranslations} from 'next-intl';
import {useCurrentUser, useLogout} from '@/lib/features/auth/use-auth';

type NavLink = {type: 'link'; label: string; href: string};
type NavDropdown = {
  type: 'dropdown';
  label: string;
  items: {label: string; href: string; description: string}[];
};
export type NavItem = NavLink | NavDropdown;

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {data: currentUser} = useCurrentUser();
  const logoutMutation = useLogout();
  const isAuthenticated = !!currentUser;

  const t = useTranslations('Navigation');

  const NAV_ITEMS: NavItem[] = [
    {label: t('home'), type: 'link', href: '/'},
    {label: t('allMeals'), type: 'link', href: '/meals'},
    {label: t('createMeal'), type: 'link', href: '/meals/create'},
    {label: t('about'), type: 'link', href: '/about'}
  ];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setMobileOpen(false);
  };

  const UserAvatar = () => (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-full bg-emerald-700 ring-2 ring-emerald-100 flex items-center justify-center text-white font-bold text-sm uppercase">
        {currentUser?.name?.charAt(0)}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold leading-none text-gray-800">
          {currentUser?.name}
        </span>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="w-full border-b border-emerald-100 bg-white relative"
    >
      {/* thin accent line tying the brand palette together */}
      <div className="h-[3px] w-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-red-600" />

      <nav className="flex justify-between w-full max-w-7xl mx-auto px-4 py-4 items-center relative">
        <Link
          href={'/'}
          className="text-2xl sm:text-3xl font-serif font-bold text-center text-emerald-700 tracking-tight italic hover:text-emerald-800 transition-colors"
        >
          Food calc
        </Link>

        <div className="hidden lg:flex items-center gap-4 xl:gap-8 whitespace-nowrap">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative">
              {item.type === 'link' ? (
                <Link
                  href={item.href}
                  className="relative text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-700 group-hover:w-full transition-all duration-200" />
                </Link>
              ) : null}
            </div>
          ))}

          <div className="h-6 w-px bg-gray-200 mx-2" />

          {!isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                href={'/register'}
                className="text-sm text-gray-700 hover:text-emerald-700 transition-colors"
              >
                {t('register')}
              </Link>
              <Link
                href={'/login'}
                className="text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors px-4 py-2 rounded-full shadow-sm"
              >
                {t('login')}
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <UserAvatar />
              <button
                onClick={handleLogout}
                className="cursor-pointer flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Log out
              </button>
            </div>
          )}
          <LocaleSwitcher />
        </div>

        <button
          className="lg:hidden p-2 text-gray-700 hover:text-emerald-700 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {mobileOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-emerald-100 shadow-xl lg:hidden p-6 z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {isAuthenticated && (
              <div className="pb-4 border-b border-gray-100">
                <UserAvatar />
              </div>
            )}

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.type === 'link' ? item.href : '#'}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium text-gray-800 hover:text-emerald-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="text-gray-700 hover:text-emerald-700 transition-colors"
                  >
                    {t('register')}
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="font-bold text-emerald-700"
                  >
                    {t('login')}
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-left flex items-center gap-1.5 text-red-600 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Log out
                </button>
              )}
              <LocaleSwitcher />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
