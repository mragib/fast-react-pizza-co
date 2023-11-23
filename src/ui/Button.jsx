import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "rounded-full text-sm bg-yellow-400  text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-1 disabled:cursor-not-allowed ";

  const style = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + "py-2 px-4 text-xs md:px-4 md:py-2.5",
    round: base + "px-2.5 py-1 text-sm md:px-2.5 md:py-1",
    secondary:
      "rounded-full   text-sm font-semibold uppercase tracking-wide text-stone-500 border-2 border-stone-300 transition-colors duration-300 hover:bg-stone-500 hover:text-stone-800 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-offset-1 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
  };

  if (to) {
    return (
      // eslint-disable-next-line react/jsx-no-undef
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );
  }

  if (onClick)
    return (
      <button className={style[type]} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <button className={style[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
