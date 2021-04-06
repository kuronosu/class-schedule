import {
  createSchedule,
  days,
  hours,
  Lesson,
  Schedule,
  validateLessonToAdd,
  validateLessonToLoad,
} from "../schedule-utils";

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export function scheduleToLessons(schedule: Schedule) {
  const lessons: Lesson[] = [];
  days.forEach((day) => {
    hours.forEach((hour) => {
      let lesson = schedule[day][hour];
      if (lesson.hasOwnProperty("duration")) lessons.push(lesson as Lesson);
    });
  });
  return lessons;
}

export function scheduleToJson(schedule: Schedule) {
  return JSON.stringify(scheduleToLessons(schedule));
}

export function jsonToLessons(raw: string) {
  if (raw == null) return null;
  return lessonsToSchedule(JSON.parse(raw));
}

export function lessonsToSchedule(lessons: Lesson[]) {
  try {
    const schedule = createSchedule();
    lessons = lessons.map((l: any) => validateLessonToLoad(l)).filter(notEmpty);
    lessons.forEach((lesson) => {
      if (!validateLessonToAdd(schedule, lesson)[0]) return;
      schedule[lesson.day][lesson.hour] = lesson;
    });
    return schedule;
  } catch (error) {
    return null;
  }
}

export function jsonToSchedule(raw: string | null) {
  if (raw == null) return null;
  return lessonsToSchedule(JSON.parse(raw));
}
