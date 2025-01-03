import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const LanguagesScalarFieldEnumSchema = z.enum(['language_id','language_name']);

export const UsersScalarFieldEnumSchema = z.enum(['user_id','username','email','password_hash','date_joined','current_language_id','user_role']);

export const ChaptersScalarFieldEnumSchema = z.enum(['chapter_id','chapter_name','language_id']);

export const LessonsScalarFieldEnumSchema = z.enum(['lesson_id','chapter_id','lesson_title','lesson_order','is_completed']);

export const ExercisesScalarFieldEnumSchema = z.enum(['exercise_id','lesson_id','exercise_type','question','answer']);

export const User_progressScalarFieldEnumSchema = z.enum(['progress_id','user_id','lesson_id','completed_at']);

export const AchievementsScalarFieldEnumSchema = z.enum(['achievement_id','name','description','icon_url']);

export const User_achievementsScalarFieldEnumSchema = z.enum(['user_achievement_id','user_id','achievement_id','earned_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const exercise_type_enumSchema = z.enum(['multiple_choice','translation','match','fill_blank']);

export type exercise_type_enumType = `${z.infer<typeof exercise_type_enumSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// LANGUAGES SCHEMA
/////////////////////////////////////////

export const languagesSchema = z.object({
  language_id: z.number().int(),
  language_name: z.string(),
})

export type languages = z.infer<typeof languagesSchema>

/////////////////////////////////////////
// USERS SCHEMA
/////////////////////////////////////////

export const usersSchema = z.object({
  user_id: z.number().int(),
  username: z.string(),
  email: z.string(),
  password_hash: z.string(),
  date_joined: z.coerce.date(),
  current_language_id: z.number().int().nullable(),
  user_role: z.string(),
})

export type users = z.infer<typeof usersSchema>

/////////////////////////////////////////
// CHAPTERS SCHEMA
/////////////////////////////////////////

export const chaptersSchema = z.object({
  chapter_id: z.number().int(),
  chapter_name: z.string(),
  language_id: z.number().int(),
})

export type chapters = z.infer<typeof chaptersSchema>

/////////////////////////////////////////
// LESSONS SCHEMA
/////////////////////////////////////////

export const lessonsSchema = z.object({
  lesson_id: z.number().int(),
  chapter_id: z.number().int(),
  lesson_title: z.string(),
  lesson_order: z.number().int(),
  is_completed: z.boolean().nullable(),
})

export type lessons = z.infer<typeof lessonsSchema>

/////////////////////////////////////////
// EXERCISES SCHEMA
/////////////////////////////////////////

export const exercisesSchema = z.object({
  exercise_type: exercise_type_enumSchema,
  exercise_id: z.number().int(),
  lesson_id: z.number().int(),
  question: z.string(),
  answer: z.string(),
})

export type exercises = z.infer<typeof exercisesSchema>

/////////////////////////////////////////
// USER PROGRESS SCHEMA
/////////////////////////////////////////

export const user_progressSchema = z.object({
  progress_id: z.number().int(),
  user_id: z.number().int(),
  lesson_id: z.number().int(),
  completed_at: z.coerce.date().nullable(),
})

export type user_progress = z.infer<typeof user_progressSchema>

/////////////////////////////////////////
// ACHIEVEMENTS SCHEMA
/////////////////////////////////////////

export const achievementsSchema = z.object({
  achievement_id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  icon_url: z.string().nullable(),
})

export type achievements = z.infer<typeof achievementsSchema>

/////////////////////////////////////////
// USER ACHIEVEMENTS SCHEMA
/////////////////////////////////////////

export const user_achievementsSchema = z.object({
  user_achievement_id: z.number().int(),
  user_id: z.number().int(),
  achievement_id: z.number().int(),
  earned_at: z.coerce.date().nullable(),
})

export type user_achievements = z.infer<typeof user_achievementsSchema>
