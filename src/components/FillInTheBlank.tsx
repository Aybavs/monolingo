"use client";
import { useState } from "react";

interface FillInTheBlankProps {
  question: string;
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
}

const FillInTheBlank = ({
  question,
  correctAnswer,
  onAnswer,
}: FillInTheBlankProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleSubmit = () => {
    if (userAnswer.trim() === "") {
      setError(true);
      setIsWrong(false);
      return;
    }

    const isAnswerCorrect = 
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    
    if (!isAnswerCorrect) {
      setIsWrong(true);
      setError(false);
      setShowCorrectAnswer(true);
    } else {
      setIsWrong(false);
      setIsCorrect(true);
    }

    onAnswer(isAnswerCorrect);
    setUserAnswer("");
  };

  return (
    <div className={`w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300
      ${isWrong ? "border-2 border-red-500 animate-shake" : ""}
      ${isCorrect ? "border-2 border-green-500" : ""}
    `}>
      <h2 className="text-xl font-bold mb-4 uppercase text-center">{question}</h2>
      <div className="relative">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => {
            setUserAnswer(e.target.value);
            setError(false);
            setIsWrong(false);
            setIsCorrect(false);
            setShowCorrectAnswer(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          className={`w-full py-2 px-4 bg-gray-700 rounded-lg mb-2 text-white
            ${error ? "border-2 border-red-500 placeholder-red-400" : ""}
            ${isWrong ? "border-2 border-red-500" : ""}
            ${isCorrect ? "border-2 border-green-500" : ""}
          `}
          placeholder={error ? "This field cannot be empty!" : "Type your answer here..."}
        />
      </div>

      {showCorrectAnswer && (
        <div className="text-yellow-400 text-sm mt-2">
          Hint: The answer starts with &quot;{correctAnswer[0]}&quot;
        </div>
      )}

      <button
        onClick={handleSubmit}
        className={`mt-4 w-full py-2 px-4 rounded-lg transition-colors
          ${isCorrect ? "bg-green-500" : "bg-blue-500"}
          hover:bg-opacity-90 text-white font-medium
        `}
      >
        Submit
      </button>
    </div>
  );
};

export default FillInTheBlank;
