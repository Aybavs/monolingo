"use client";
import Navbar from "@/components/Navbar";
import { CheckCircle, Lock, Star, ChevronDown, ChevronUp } from "lucide-react"; // İkonlar
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import {
  getChapters,
  getLessons,
  getCompletedLessons,
} from "@/lib/user/userService";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useRouter } from "next/navigation";

// Add this type
interface ChapterProgress {
  total: number;
  completed: number;
}

const LearnPage = () => {
  const [chapters, setChapters] = useState<
    { chapter_id: number; chapter_name: string }[]
  >([]);
  const [lessons, setLessons] = useState<{
    [key: number]: { lesson_id: number; lesson_title: string }[];
  }>({});
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedChapters, setExpandedChapters] = useState<number[]>([]);
  const [chapterProgress, setChapterProgress] = useState<{
    [key: number]: ChapterProgress;
  }>({});

  const [loading, setLoading] = useState(true);
  const totalLessons = Object.values(lessons).reduce(
    (acc, lessonArray) => acc + lessonArray.length,
    0
  );
  const router = useRouter(); // Router for navigation

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const chapterData = await getChapters();
        const sortedChapters = chapterData.sort(
          (a, b) => a.chapter_id - b.chapter_id
        );
        setChapters(sortedChapters);

        const allLessons: { [key: number]: any[] } = {};
        const lessonPromises = chapterData.map(
          async (chapter: { chapter_id: number; chapter_name: string }) => {
            const lessonData = await getLessons(String(chapter.chapter_id));
            allLessons[chapter.chapter_id] = lessonData;
          }
        );
        await Promise.all(lessonPromises);
        setLessons(allLessons);

        const completedData = await getCompletedLessons();
        const completedLessonIds = Array.isArray(completedData)
          ? completedData.map((lesson) => lesson.lesson_id)
          : [];
        setCompletedLessons(completedLessonIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Chapter Progress Calculation
  useEffect(() => {
    const progress: { [key: number]: ChapterProgress } = {};
    for (const chapterId of Object.keys(lessons)) {
      const total = lessons[Number(chapterId)].length;
      const completed = lessons[Number(chapterId)].filter((lesson) =>
        completedLessons.includes(lesson.lesson_id)
      ).length;
      progress[Number(chapterId)] = { total, completed };
    }
    setChapterProgress(progress);
  }, [lessons, completedLessons]);

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(
      (prev) =>
        prev.includes(chapterId)
          ? prev.filter((id) => id !== chapterId) // Kapat
          : [...prev, chapterId] // Aç
    );
  };

  const navigateToLesson = (lessonId: number) => {
    router.push(`/lesson?lesson_id=${lessonId}`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-16 w-full" />
            <div className="pl-8 space-y-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Navbar />

      <main className="flex-1 p-6 w-full max-w-4xl mx-auto overflow-y-scroll scrollbar-hide">
        {/* Add Progress Bar Here */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-gray-700/50 rounded-full h-3 mb-2">
            <motion.div
              className="bg-yellow-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(completedLessons.length / totalLessons) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-white/80 text-sm text-center">
            {completedLessons.length} of {totalLessons} lessons completed
          </div>
        </div>
        <div className="space-y-8">
          {chapters.map((chapter, chapterIndex) => (
            <div
              key={
                [...chapters]
                  .sort((a, b) => a.chapter_id - b.chapter_id)
                  .find((c) => c.chapter_id === chapter.chapter_id)?.chapter_id
              }
              className="mb-8"
            >
              {/* Chapter Başlık */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 bg-zinc-600 text-white rounded-lg shadow-md"
                onClick={() => toggleChapter(chapter.chapter_id)}
              >
                <div className="flex justify-between items-center w-full space-y-2">
                  <span className="text-xl font-bold text-center flex-1">
                    {chapter.chapter_name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {chapterProgress[chapter.chapter_id]?.completed || 0}/
                      {chapterProgress[chapter.chapter_id]?.total || 0}
                    </span>
                    {expandedChapters.includes(chapter.chapter_id) ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </div>
                </div>
              </motion.button>

              {/* Dersler (Açılır) */}
              <AnimatePresence>
                {expandedChapters.includes(chapter.chapter_id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 flex flex-col items-center relative"
                  >
                    {lessons[chapter.chapter_id]?.map((lesson, lessonIndex) => {
                      const isCurrentChapterUnlocked =
                        chapterIndex === 0 || // İlk chapter her zaman açık
                        lessons[chapters[chapterIndex - 1]?.chapter_id]?.every(
                          (prevLesson) =>
                            completedLessons.includes(prevLesson.lesson_id)
                        );

                      const isLessonAvailable =
                        isCurrentChapterUnlocked &&
                        (lessonIndex === 0 || // İlk ders her zaman "Başlatılabilir" durumunda
                          completedLessons.includes(
                            lessons[chapter.chapter_id][lessonIndex - 1]
                              ?.lesson_id
                          ));

                      return (
                        <motion.div
                          key={lesson.lesson_id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: lessonIndex * 0.1,
                            type: "spring",
                            stiffness: 100,
                          }}
                          whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 },
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="relative"
                        >
                          <motion.div
                            animate={{
                              x: Math.sin(lessonIndex * 0.7) * 100,
                              transition: { duration: 0.5, type: "spring" },
                            }}
                          >
                            {/* Existing Button Component */}
                            <Button
                              className={clsx(
                                "relative group p-10 m-3 rounded-full",
                                "transition-all duration-300 transform",
                                "hover:shadow-lg",
                                {
                                  "hover:shadow-green-500/25":
                                    completedLessons.includes(lesson.lesson_id),
                                  "hover:shadow-yellow-500/25":
                                    !completedLessons.includes(
                                      lesson.lesson_id
                                    ),
                                  "bg-green-500 hover:bg-green-600":
                                    completedLessons.includes(lesson.lesson_id),
                                  "bg-yellow-500 hover:bg-yellow-600":
                                    isLessonAvailable &&
                                    !completedLessons.includes(
                                      lesson.lesson_id
                                    ),
                                  "bg-gray-500": !isLessonAvailable,
                                }
                              )}
                              disabled={completedLessons.includes(
                                lesson.lesson_id
                              )}
                              onClick={() =>
                                isLessonAvailable &&
                                navigateToLesson(lesson.lesson_id)
                              }
                            >
                              {completedLessons.includes(lesson.lesson_id) ? (
                                <CheckCircle
                                  size={35}
                                  color="white"
                                  aria-label="Completed"
                                />
                              ) : isLessonAvailable ? (
                                <Star
                                  size={40}
                                  color="white"
                                  aria-label="Available"
                                />
                              ) : (
                                <Lock
                                  size={35}
                                  color="white"
                                  aria-label="Locked"
                                />
                              )}
                            </Button>
                            <div
                              role="tooltip"
                              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                                opacity-0 group-hover:opacity-100 bg-black/90 text-white text-sm px-3 py-2 
                                rounded-lg shadow-lg transition-all duration-200 whitespace-nowrap z-10
                                backdrop-blur-sm"
                            >
                              <strong>{lesson.lesson_title}</strong>
                              {isLessonAvailable &&
                                !completedLessons.includes(
                                  lesson.lesson_id
                                ) && (
                                  <span className="block text-xs text-yellow-400 mt-1">
                                    Click to start
                                  </span>
                                )}
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LearnPage;
