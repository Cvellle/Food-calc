export function AuthCard({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="
        m-auto
        mt-[30px]
        md:mt-[100px]
        max-w-md
        rounded-2xl
        bg-white
        p-8
        shadow-xl
        border border-gray-100
      "
    >
      <h1 className="text-2xl font-bold text-center text-emerald-700 mb-6">
        {title}
      </h1>
      {children}
    </section>
  );
}
