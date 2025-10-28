import React, { useState, useCallback, useMemo } from 'react';
import { CardCategory, Player, GameState, CategoryInfo } from './types';
import { CATEGORIES } from './constants';
import { generateCardContent } from './services/geminiService';
import Card from './components/Card';
import { LogoIcon } from './components/Icons';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.SELECTING);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(Player.Player1);
  const [cardContent, setCardContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo | null>(null);

  const handleSelectCategory = useCallback(async (category: CategoryInfo) => {
    setGameState(GameState.LOADING);
    setError(null);
    
    let categoryToProcess = category;
    if (category.id === CardCategory.RANDOM) {
      const otherCategories = CATEGORIES.filter(c => c.id !== CardCategory.RANDOM);
      categoryToProcess = otherCategories[Math.floor(Math.random() * otherCategories.length)];
    }

    setSelectedCategory(categoryToProcess);

    try {
      const content = await generateCardContent(categoryToProcess);
      setCardContent(content);
      setGameState(GameState.REVEALED);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado');
      setGameState(GameState.SELECTING);
      setSelectedCategory(null);
    }
  }, []);

  const handleNextTurn = () => {
    setCurrentPlayer(prev => prev === Player.Player1 ? Player.Player2 : Player.Player1);
    setGameState(GameState.SELECTING);
    setCardContent('');
    setSelectedCategory(null);
  };

  const isCardFlipped = useMemo(() => gameState === GameState.REVEALED, [gameState]);

  const CardBack = () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl text-white p-4 ring-2 ring-gray-600">
      {gameState === GameState.LOADING ? (
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <p className="text-md font-semibold tracking-wider">Generando...</p>
        </div>
      ) : (
        <>
            <div className="text-rose-400">
                <LogoIcon className="w-8 h-8"/>
            </div>
            <h2 className="text-2xl font-serif mt-2">First Date</h2>
            <p className="mt-1 text-gray-400 text-sm">Elige una categoría para empezar</p>
        </>
      )}
    </div>
  );

  const CardFront = () => {
    if (!selectedCategory) return null;

    const getFontSizeClass = (text: string): string => {
        const length = text.length;
        if (length < 80) return 'text-xl md:text-2xl';
        if (length < 120) return 'text-lg md:text-xl';
        if (length < 180) return 'text-base md:text-lg';
        return 'text-sm md:text-base';
    };

    const fontSizeClass = useMemo(() => getFontSizeClass(cardContent), [cardContent]);

    return (
      <div className={`w-full h-full flex flex-col justify-between items-center text-center bg-gradient-to-br ${selectedCategory.gradient} rounded-2xl p-4 text-white shadow-2xl`}>
        <div className="w-full flex-shrink-0">
          <p className="text-base opacity-80">Turno de:</p>
          <h3 className="text-2xl font-bold font-serif">{currentPlayer}</h3>
        </div>

        <div className="my-2 flex-grow flex items-center justify-center px-2">
            <p className={`font-serif leading-relaxed transition-all duration-300 ${fontSizeClass}`}>
                {cardContent}
            </p>
        </div>

        <div className="w-full flex justify-between items-center mt-auto flex-shrink-0">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-black bg-opacity-20">
            <span className="text-2xl">{selectedCategory.icon}</span>
          </div>
          <button
            onClick={handleNextTurn}
            className="bg-white text-gray-800 font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 text-gray-800 flex flex-col items-center p-2 sm:p-4 selection:bg-rose-200">
        <header className="self-start w-full max-w-7xl mx-auto flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold font-serif flex items-center gap-3">
                <div className="text-rose-500"><LogoIcon className="w-8 h-8 md:w-10 md:h-10"/></div>
                First Date Game
            </h1>
        </header>

        <main className="w-full max-w-7xl flex flex-col items-center justify-center flex-grow py-1 min-h-0">
          <div className="flex flex-col items-center justify-center w-full h-full">
              {gameState !== GameState.REVEALED && (
                <div className="mb-2 text-center flex-shrink-0">
                    <p className="text-lg sm:text-xl">Turno de:</p>
                    <h2 className="text-3xl sm:text-4xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-500 transition-all duration-300">
                        {currentPlayer}
                    </h2>
                </div>
              )}
              
              <div className={`w-full max-w-md my-2 transition-all duration-500 flex-grow relative ${isCardFlipped ? 'max-h-[80vh]' : 'max-h-[60vh]'}`}>
                  <div className="absolute inset-0">
                    <Card 
                        isFlipped={isCardFlipped}
                        backContent={<CardBack />}
                        frontContent={<CardFront />}
                    />
                  </div>
              </div>
              
              {error && <p className="text-red-500 my-1 text-center animate-pulse flex-shrink-0">{error}</p>}
              
              {gameState !== GameState.REVEALED && (
                <div className="w-full max-w-2xl mt-auto flex-shrink-0">
                    <div className="grid grid-cols-3 gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => handleSelectCategory(cat)}
                                disabled={gameState === GameState.LOADING}
                                className={`flex flex-col items-center justify-center text-white p-2 h-20 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${cat.color}`}
                            >
                                <span className="text-2xl">{cat.icon}</span>
                                <span className="mt-1 font-semibold text-xs text-center">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
              )}
          </div>
        </main>

        <footer className="text-center text-gray-500 text-xs flex-shrink-0 py-1">
            <p>Creado para una primera cita inolvidable.</p>
        </footer>
    </div>
  );
};

export default App;
