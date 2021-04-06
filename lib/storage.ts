import {
  days,
  hours,
  Lesson,
  Schedule,
  validateLessonToLoad,
} from "./schedule-utils";

export const SCHEDULE_KEY = "SCHEDULE_KEY";

export const load = (): Lesson[] => {
  const raw = localStorage.getItem(SCHEDULE_KEY);
  if (raw == null) return [];
  try {
    return JSON.parse(raw)
      .map((l: any) => validateLessonToLoad(l))
      .filter((el: Lesson | null) => el !== null);
  } catch (error) {
    return [];
  }
};

export const save = async (schedule: Schedule) => {
  const lessons: Lesson[] = [];
  days.forEach((day) => {
    hours.forEach((hour) => {
      if (schedule[day][hour].hasOwnProperty("duration"))
        lessons.push(schedule[day][hour] as Lesson);
    });
  });
  localStorage.setItem(SCHEDULE_KEY, JSON.stringify(lessons));
};
