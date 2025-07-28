function Section({ title, content, id, children, dark }) {
  return (
    <section
      className={`w-full min-h-screen flex flex-col items-center justify-center py-15 scroll-mt-14 ${
        dark
          ? "bg-neutral-700 text-neutral-50"
          : "bg-neutral-50 text-neutral-700"
      }`}
      id={id}
    >
      <h2 className="text-4xl font-bold mb-4 text-center">{title}</h2>
      <p className="text-lg text-center">{content}</p>
      {children}
    </section>
  );
}

export default Section;
