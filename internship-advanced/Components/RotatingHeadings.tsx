interface RotatingHeadingsProps {
  phrases: string[];
  activeIndex: number;
}

export default function RotatingHeadings({ phrases, activeIndex }: RotatingHeadingsProps) {
  return (
    <div>
      {phrases.map((phrase, index) => (
        <div
          key={index}
          className={`text-[24px] sm:text-[32px] font-medium mb-4 transition-colors duration-400 ease-out last:mb-0 ${
    index === activeIndex ? 'text-highlight' : 'text-[#6b757b]'}`}
        >
          {phrase}
        </div>
      ))}
    </div>
  );
}