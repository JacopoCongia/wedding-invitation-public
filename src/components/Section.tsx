import { motion } from "motion/react";

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
      className={`flex min-h-screen w-full scroll-mt-[59px] flex-col items-center justify-center py-15 ${
        dark
          ? "bg-neutral-700 text-neutral-50"
          : "bg-neutral-50 text-neutral-700"
      }`}
      id={id}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <h2 className="great-vibes-font mb-4 px-5 text-[3rem] tracking-wide min-[600px]:text-[4rem]">
          {title}
        </h2>
        <div className="mb-10 flex flex-col items-center gap-6 min-[700px]:w-[600px]">
          {picture && (
            <div className="flex flex-col items-center">
              <img
                src={picture.src}
                alt={picture.alt}
                className="w-full border-[6px] min-[700px]:rounded-xl min-[700px]:border-neutral-50"
              />
              <p className="self-end text-[0.7rem]">{picture.credit}</p>
            </div>
          )}
          {content.map((paragraph, index) => (
            <p
              key={index}
              className={`px-[1.8em] text-center text-lg min-[600px]:px-0 min-[600px]:text-center`}
            >
              {paragraph}
            </p>
          ))}
        </div>
        {children}
      </motion.div>
    </section>
  );
}

export default Section;
