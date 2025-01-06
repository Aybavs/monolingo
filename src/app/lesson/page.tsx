"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import TranslationExercise from "@/components/TranslationExercise";
import MultipleChoiceExercise from "@/components/MultipleChoice";
import FillBlankExercise from "@/components/FillInTheBlank";
import { getExercises, markLessonComplete } from "@/lib/user/userService";
import { useRouter } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";

interface Exercise {
  exercise_id: number;
  lesson_id: number;
  exercise_type: "translation" | "multiple_choice" | "fill_blank";
  question: string;
  answer: string;
}

const LessonPage = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lesson_id");
  const router = useRouter();

  const handleHomeClick = () => {
    if (window.confirm("Are you sure you want to return to the main menu?")) {
      router.push("/learn");
    }
  };

  useEffect(() => {
    const fetchExercises = async () => {
      if (!lessonId) {
        console.error("Lesson ID not provided!");
        return;
      }

      try {
        setLoading(true);
        const data = await getExercises(lessonId);
        setExercises(data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [lessonId]);

  const handleAnswer = async (isCorrect: boolean) => {
    if (!isCorrect) {
      return;
    }

    if (currentExerciseIndex + 1 < exercises.length) {
      setCurrentExerciseIndex((prev) => prev + 1);
    } else {
      // Complete lesson
      if (lessonId) {
        try {
          await markLessonComplete(Number(lessonId));
          router.push("/learn");
        } catch (error) {
          console.error("Failed to mark lesson as complete:", error);
          alert("Error completing lesson. Please try again.");
        }
      } else {
        router.push("/learn");
      }
    }
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (!exercises || exercises.length === 0) {
    return (
      <div className="text-white text-center">No exercises available!</div>
    );
  }

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      <div className="relative">
        {" "}
        {/* Add a relative container */}
        <button
          onClick={handleHomeClick}
          className="absolute top-4 left-4 p-2 text-2xl text-gray-600 hover:text-gray-800 z-10" // Added z-10
          aria-label="Return to main menu"
        >
          <IoHomeOutline />
        </button>
      </div>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full mix-blend-overlay blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/10 rounded-full mix-blend-overlay blur-3xl animate-pulse delay-100 transform translate-x-1/2" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full mix-blend-overlay blur-3xl animate-pulse delay-200" />
      </div>

      {/* Enhanced exercise counter - stays fixed */}
      <div className="fixed top-4 right-4 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-yellow-500/20">
        <div className="text-yellow-500 text-sm font-medium tracking-wider">
          Exercise {currentExerciseIndex + 1} of {exercises.length}
        </div>
      </div>

      {/* Main content with improved centering and transitions */}
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        {/* Moved progress bar here */}
        <div className="w-full max-w-4xl mb-8">
          <div className="h-1 bg-gray-800/50 backdrop-blur-sm rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 progress-bar"
              style={{
                width: `${(currentExerciseIndex / exercises.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto relative z-10">
          {loading ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce delay-100" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce delay-200" />
            </div>
          ) : (
            <div className="space-y-8 transform flex items-center justify-center transition-all duration-300 ease-out">
              {/* Existing exercise components */}
              {currentExercise.exercise_type === "translation" && (
                <TranslationExercise
                  question={currentExercise.question}
                  correctAnswer={currentExercise.answer}
                  onAnswer={handleAnswer}
                />
              )}
              {currentExercise.exercise_type === "multiple_choice" && (
                <MultipleChoiceExercise
                  question={currentExercise.question}
                  correctAnswer={currentExercise.answer}
                  exerciseId={currentExercise.exercise_id}
                  onAnswer={handleAnswer}
                />
              )}
              {currentExercise.exercise_type === "fill_blank" && (
                <FillBlankExercise
                  question={currentExercise.question}
                  correctAnswer={currentExercise.answer}
                  onAnswer={handleAnswer}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Optional: Add a subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ffffff' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: "4px 4px",
        }}
      />
    </div>
  );
};

export default LessonPage;
