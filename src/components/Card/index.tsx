
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      role="region"
      className={`
        bg-white/5
        backdrop-blur-sm
        border border-white/10
        rounded-2xl
        p-4 md:p-6
        shadow-xl
        hover:shadow-2xl
        hover:bg-white/10
        transition-all duration-300
        hover:-translate-y-1
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
