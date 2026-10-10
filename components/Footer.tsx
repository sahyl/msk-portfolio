export function Footer() {
  return (
    <footer className="py-8 px-4 text-center mt-8">
      <div className="h-px w-16 mx-auto mb-6" style={{ backgroundColor: "var(--primary)" }} aria-hidden="true" />
      <p className="font-doto text-xl font-bold tracking-wider text-black dark:text-white">
        {new Date().getFullYear()} Sahil Khan
      </p>
    </footer>
  );
}
