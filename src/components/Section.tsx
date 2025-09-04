interface SectionProps {
  id: string;
  title: string;
  content: string[];
  picture?: { src: string; alt: string; credit: string };
  children?: React.ReactNode;
  dark?: boolean; // Optional prop to determine if the section should have a dark background
}

function Section({
  id,
  title,
  content,
  picture,
  children,
  dark,
}: SectionProps) {
  return (
    <section
      className={`w-full min-h-screen flex flex-col items-center justify-center py-15 scroll-mt-[59px] ${
        dark
          ? "bg-neutral-700 text-neutral-50"
          : "bg-neutral-50 text-neutral-700"
      }`}
      id={id}
    >
      <h2 className="great-vibes-font tracking-wide text-[3rem] px-5 mb-4 min-[600px]:text-[4rem]">
        {title}
      </h2>
      <div className="flex flex-col gap-6 items-center mb-10 min-[700px]:w-[600px]">
        {picture && (
          <div className="flex flex-col items-center">
            <img
              src={picture.src}
              alt={picture.alt}
              className="w-full border-[6px] min-[700px]:border-neutral-50 min-[700px]:rounded-xl"
            />
            <p className="self-end text-[0.7rem]">{picture.credit}</p>
          </div>
        )}
        {content.map((paragraph, index) => (
          <p
            key={index}
            className={`text-lg text-center px-[1.8em] min-[600px]:text-justify min-[600px]:px-0`}
          >
            {paragraph}
          </p>
        ))}
      </div>
      {children}
    </section>
  );
}

export default Section;
