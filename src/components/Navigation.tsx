'use client';

import {useState, useRef, useEffect} from 'react';
import Link from 'next/link';
import LocaleSwitcher from './LocaleSwitcher';
import {useTranslations} from 'next-intl';
import {endpoint} from '../../config/endpoint';
import {
  fetchCurrentUser,
  logout,
  selectCurrentUser,
  selectIsAuthenticated
} from '@/lib/features/auth/authSlice';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@/lib/store';
import {fetchWithAuth} from '@/hooks/useFetchWithAuth';

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

  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

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
    dispatch(fetchCurrentUser());
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    await fetch(`${endpoint}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    dispatch(logout());
    setMobileOpen(false);
  };

  const toggle = (key: string) =>
    setOpen((prev) => (prev === key ? null : key));

  const UserAvatar = () => (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-white font-bold text-sm uppercase">
        {currentUser?.name?.charAt(0)}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold leading-none">
          {currentUser?.name}
        </span>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="w-full border-b border-emerald-600 bg-white"
    >
      <nav className="flex justify-between w-full max-w-7xl mx-auto px-4 py-4 items-center relative">
        <Link
          href={'/'}
          className="text-2xl sm:text-3xl font-serif font-bold text-center text-emerald-600 tracking-tight italic"
        >
          Food calc
        </Link>

        <div className="hidden lg:flex items-center gap-4 xl:gap-8 whitespace-nowrap">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="relative">
              {item.type === 'link' ? (
                <Link
                  href={item.href}
                  className="hover:text-emerald-800 transition text-sm font-medium"
                >
                  {item.label}
                </Link>
              ) : null}
            </div>
          ))}

          <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>

          {!isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                href={'/register'}
                className="text-sm hover:text-emerald-800"
              >
                {t('register')}
              </Link>
              <Link
                href={'/login'}
                className="text-sm font-semibold text-emerald-800 hover:text-emerald-800"
              >
                {t('login')}
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <UserAvatar />
              <button
                onClick={handleLogout}
                className="cursor-pointer text-sm text-red-800 hover:underline"
              >
                {'Log out'}
              </button>
            </div>
          )}
          <LocaleSwitcher />
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        {mobileOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b shadow-xl lg:hidden p-6 z-50 flex flex-col gap-4">
            {isAuthenticated && (
              <div className="pb-4 border-b">
                <UserAvatar />
              </div>
            )}

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.type === 'link' ? item.href : '#'}
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-4 border-t flex flex-col gap-4">
              {!isAuthenticated ? (
                <>
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    {t('register')}
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="font-bold text-emerald-800"
                  >
                    {t('login')}
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-left text-red-500 font-medium"
                >
                  {'Log out'}
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
