import { useGame } from "@/hooks/use-game";

export function Board() {
  const { board, errorCell, handleClick } = useGame();

  return (
    <section className="grid grid-cols-3 grid-rows-3 gap-4 aspect-square w-full max-w-lg">
      {board.map((value, index) => (
        <button
          onClick={() => handleClick(index)}
          key={index}
          className={`text-4xl bg-black/60 font-bold flex items-center justify-center cursor-pointer transition-colors duration-200 rounded-md aspect-square ${
            errorCell === index
              ? "bg-red-500 animate-shake"
              : "bg-black/60 hover:bg-black/80"
          }`}
        >
          {value}
        </button>
      ))}
    </section>
  );
}
