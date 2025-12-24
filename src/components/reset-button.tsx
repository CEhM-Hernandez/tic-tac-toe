import { useGame } from "@/hooks/use-game";

export function ResetButton({ className }: { className?: string }) {
  const { handleReset } = useGame();

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
