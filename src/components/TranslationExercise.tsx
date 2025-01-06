"use client";
import { useState, useRef } from "react";
import { playAudio } from "@/lib/user/userService";

interface TranslationExerciseProps {
  question: string;
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
}

interface AudioCache {
  [key: string]: HTMLAudioElement;
}

const TranslationExercise = ({
  question,
  correctAnswer,
  onAnswer,
}: TranslationExerciseProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCache = useRef<AudioCache>({});

  const handlePlayAudio = async (text: string) => {
    if (isPlaying) return;

    try {
      setIsPlaying(true);
      let audio: HTMLAudioElement;

      if (audioCache.current[text]) {
        audio = audioCache.current[text];
      } else {
        const { audioUrl } = await playAudio(text);
        audio = new Audio(audioUrl);
        audioCache.current[text] = audio;
      }

      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        console.error("Error playing audio");
        setIsPlaying(false);
      };

      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  const handleSubmit = () => {
    if (userAnswer.trim() === "") {
      setError(true);
      setIsWrong(false);
      return;
    }
    const isCorrect =
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    if (!isCorrect) {
      setIsWrong(true);
      setError(false);
      setShowCorrectAnswer(true);
    } else {
      setIsWrong(false);
      setIsCorrect(true);
    }
    onAnswer(isCorrect);
    setUserAnswer("");
  };

  return (
    <div
      className={`w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300
      ${isWrong ? "border-2 border-red-500 animate-shake" : ""}
      ${isCorrect ? "border-2 border-green-500" : ""}
    `}
    >
      <h2
        onClick={() => handlePlayAudio(question)}
        className="text-xl text-center uppercase font-bold mb-4 text-yellow-300 
    cursor-pointer hover:text-yellow-400 flex items-center justify-center gap-2"
      >
        Translate: {question}
        <div className="relative">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM12 15.94L7.5 11.44H4v-2h3.5L12 5.94v10z" />
          </svg>
          {isPlaying && (
            <svg
              className="w-5 h-5 animate-pulse absolute top-0 left-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.24 7.76A5.974 5.974 0 0 1 18 12c0 1.71-.72 3.24-1.86 4.34l1.42 1.42A7.95 7.95 0 0 0 20 12c0-2.54-1.19-4.81-3.04-6.27L16.24 7.76zM19.07 4.93l-1.43 1.43A9.98 9.98 0 0 1 22 12c0 3.18-1.47 6.01-3.77 7.86l1.42 1.42A11.94 11.94 0 0 0 24 12c0-3.98-1.94-7.51-4.93-9.07zM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
          )}
        </div>
      </h2>
      <div className="relative">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => {
            setUserAnswer(e.target.value);
            setError(false);
            setIsWrong(false);
            setShowCorrectAnswer(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          aria-label="Translation input"
          className={`w-full py-2 px-4 bg-gray-700 rounded-lg mb-2 text-white 
            ${error || isWrong ? "border-2 border-red-500" : ""}
            ${isCorrect ? "border-2 border-green-500" : ""}
          `}
          placeholder={
            error ? "This field cannot be empty!" : "Type your answer here..."
          }
        />
      </div>

      {showCorrectAnswer && (
        <div className="text-yellow-400 text-sm mt-2">
          Hint: The answer starts with &quot;{correctAnswer[0]}&quot;
        </div>
      )}

      <button
        onClick={handleSubmit}
        className={`mt-4 w-full py-2 px-4 rounded-lg transition-colors bg-green-500
          hover:bg-opacity-90 text-white font-medium
        `}
      >
        Submit
      </button>
    </div>
  );
};

export default TranslationExercise;
