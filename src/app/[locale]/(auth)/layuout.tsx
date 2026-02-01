export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <main
      className="
        w-full
        min-h-screen
        grid
        place-items-center
        bg-gradient-to-br from-emerald-50 via-white to-red-50
        px-4
      "
    >
      {children}
    </main>
  );
}
