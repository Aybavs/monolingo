import { get, post } from "@/services/api";

// Tüm chapterları getirme fonksiyonu
export const getChapters = async () => {
  try {
    return await get("/chapters");
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error;
  }
};

// Belirli bir chapter'ın derslerini getirme fonksiyonu
export const getLessons = async (chapterId: string) => {
  try {
    return await get(`/lessons/getLessons/${chapterId}`);
  } catch (error) {
    console.error(`Error fetching lessons for chapter ${chapterId}:`, error);
    throw error;
  }
};
export const getCompletedLessons = async () => {
  try {
    const response = await get("/lessons/getCompletedLessons");
    if (Array.isArray(response)) {
      return response;
    }
    return response.completedLessons || [];
  } catch (error) {
    console.error("Error fetching completed lessons:", error);
    return [];
  }
};
export const getExercises = async (lessonId: string) => {
  try {
    return await get(`/exercises/${lessonId}/exercises`);
  } catch (error) {
    console.error(`Error fetching exercises for lesson ${lessonId}:`, error);
    throw error;
  }
};
export const getWrongAnswers = async (exerciseId: number) => {
  try {
    const response = await post("/lessons/RandomWrongAnswers", {
      exercise_id: exerciseId,
    });
    return response.wrongAnswers.map((item: { answer: string }) => item.answer);
  } catch (error) {
    console.error(
      `Error fetching wrong answers for exercise ${exerciseId}:`,
      error
    );
    throw error;
  }
};

export const markLessonComplete = async (lessonId: number) => {
  try {
    const response = await post("/progress/complete", {
      lesson_id: lessonId,
    });
    return response.message;
  } catch (error) {
    console.error(`Error marking lesson ${lessonId} as complete:`, error);
    throw error;
  }
};

export const playAudio = async (text: string) => {
  try {
    const response = await post("/speech/textToSpeech", { text });
    return response;
  } catch (error) {
    console.error("Error playing audio:", error);
    throw error;
  }
};

export const getCredits = async () => {
  try {
    return await get("/credits");
  } catch (error) {
    console.error("Error fetching credits:", error);
    throw error;
  }
};

export const addCredits = async (amount: number) => {
  try {
    return await post("/credits/add", {
      amount: amount,
    });
  } catch (error) {
    console.error("Error adding credits:", error);
    throw error;
  }
};
