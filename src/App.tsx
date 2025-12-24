import "@/App.css";
import { useGame } from "./hooks/use-game";

function App() {
  const { board, currentPlayer, errorCell, handleClick, handleReset, winner } =
    useGame();

  return (
    <main className="flex flex-col items-center justify-center w-full h-dvh gap-4 p-10 relative">
      {winner && <WinnerBanner winner={winner} handleReset={handleReset} />}
      <ResetButton
        className="absolute top-5 right-5"
        handleReset={handleReset}
      />
      <header className="flex flex-col gap-2 items-center justify-center">
        <h1 className="text-5xl font-bold text-center">Tic Tac Toe</h1>
        <h2 className="text-xl font-bold text-yellow-500 decoration-1">
          turno de: {currentPlayer}
        </h2>
      </header>
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
    </main>
  );
}

function ResetButton({
  handleReset,
  className,
}: {
  handleReset: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={handleReset}
      className={`px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors duration-200 cursor-pointer ${
        className ?? ""
      }`}
    >
      Reiniciar Juego
    </button>
  );
}

function WinnerBanner({
  winner,
  handleReset,
}: {
  winner: "X" | "O" | "Draw";
  handleReset: () => void;
}) {
  return (
    <div
      className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 z-20"
      onClick={handleReset}
    >
      <div
        className="flex flex-col bg-gray-600 p-10 rounded-md gap-4 items-center justify-center z-30 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="flex items-center justify-center absolute top-2 right-2 text-white cursor-pointer bg-red-500 rounded-md size-6 text-sm font-bold pb-0.5"
          onClick={handleReset}
        >
          x
        </span>
        <h2 className="text-4xl font-bold text-white">
          ¡El ganador es: {winner}!
        </h2>
        <ResetButton handleReset={handleReset} className="text-lg" />
      </div>
    </div>
  );
}

export default App;
