"use client";
import { useState, useEffect } from "react";
import { getWrongAnswers } from "@/lib/user/userService"; // Import the API function

interface MultipleChoiceProps {
  question: string;
  correctAnswer: string;
  exerciseId: number; // For fetching wrong answers
  onAnswer: (isCorrect: boolean) => void;
}

const MultipleChoice = ({
  question,
  correctAnswer,
  exerciseId,
  onAnswer,
}: MultipleChoiceProps) => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    const fetchAndSetOptions = async () => {
      try {
        const wrongAnswers = await getWrongAnswers(exerciseId);
        const allOptions = [...wrongAnswers, correctAnswer].sort(
          () => Math.random() - 0.5
        );
        setOptions(allOptions);
      } catch (error) {
        console.error("Error fetching wrong answers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetOptions();
  }, [exerciseId, correctAnswer]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setError(false);
    setIsWrong(false);
    setIsCorrect(false);
    setShowCorrectAnswer(false);
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      setError(true);
      setIsWrong(false);
      return;
    }

    const isAnswerCorrect = selectedOption === correctAnswer;
    if (!isAnswerCorrect) {
      setIsWrong(true);
      setError(false);
      setShowCorrectAnswer(true);
    } else {
      setIsWrong(false);
      setIsCorrect(true);
    }

    onAnswer(isAnswerCorrect);
    setSelectedOption(null);
  };

  if (loading) {
    return <div className="text-white text-center">Loading options...</div>;
  }

  return (
    <div
      className={`w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300
        ${isWrong ? "border-2 border-red-500 animate-shake" : ""}
        ${isCorrect ? "border-2 border-green-500" : ""}
      `}
    >
      <h2 className="text-xl font-bold mb-4 uppercase text-center">
        {question}
      </h2>
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={`w-full py-2 px-4 rounded-lg text-left transition-colors
              ${
                selectedOption === option
                  ? isWrong
                    ? "bg-red-500 text-white"
                    : isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }
              ${error ? "border-2 border-red-500" : ""}
            `}
          >
            {option}
          </button>
        ))}
      </div>

      {showCorrectAnswer && (
        <div className="text-yellow-400 text-sm mt-2">
          Hint: Try looking for an answer that matches the question more closely
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedOption}
        className={`mt-6 w-full py-2 px-4 rounded-lg transition-colors bg-green-500
          hover:bg-opacity-90 text-white font-medium
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        Submit
      </button>
    </div>
  );
};

export default MultipleChoice;
