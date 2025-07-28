interface SectionProps {
  title: string;
  content: string;
  id: string;
  children?: React.ReactNode;
  dark?: boolean; // Optional prop to determine if the section should have a dark background
}

function Section({ title, content, id, children, dark }: SectionProps) {
  return (
    <section
      className={`w-full min-h-screen flex flex-col items-center justify-center py-15 scroll-mt-14 ${
        dark
          ? "bg-neutral-700 text-neutral-50"
          : "bg-neutral-50 text-neutral-700"
      }`}
      id={id}
    >
      <h2 className="text-4xl px-5 font-bold mb-4 text-center">{title}</h2>
      <p className="text-lg text-center">{content}</p>
      {children}
    </section>
  );
}

export default Section;
