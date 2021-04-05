import { Color, validateColor } from "./colors";

export type Days = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";
export const days: Days[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
export type Hours =
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;
export const hours: Hours[] = [
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
];

export type ScheduleLessonNotAssigned = {
  day: Days;
  hour: Hours;
};

export type Lesson = ScheduleLessonNotAssigned & {
  name: string;
  url: string;
  duration: number;
  color: Color;
};

export type LessonsOfDay = {
  [hour in Hours]: Lesson | ScheduleLessonNotAssigned;
};

export type Schedule = {
  [day in Days]: LessonsOfDay;
};

export const initialSchedule: Schedule = createSchedule();

export function createSchedule(): Schedule {
  return {
    MON: createHours("MON"),
    TUE: createHours("TUE"),
    WED: createHours("WED"),
    THU: createHours("THU"),
    FRI: createHours("FRI"),
    SAT: createHours("SAT"),
  };
}

function createHours(day: Days): LessonsOfDay {
  return {
    7: { day, hour: 7 },
    8: { day, hour: 8 },
    9: { day, hour: 9 },
    10: { day, hour: 10 },
    11: { day, hour: 11 },
    12: { day, hour: 12 },
    13: { day, hour: 13 },
    14: { day, hour: 14 },
    15: { day, hour: 15 },
    16: { day, hour: 16 },
    17: { day, hour: 17 },
    18: { day, hour: 18 },
    19: { day, hour: 19 },
    20: { day, hour: 20 },
  };
}

export function isOverlap(schedule: Schedule, lesson: Lesson): boolean {
  let collision = false;
  Object.values(schedule[lesson.day]).forEach((iterLesson) => {
    if (
      iterLesson.hour >= lesson.hour &&
      iterLesson.hour < lesson.hour + lesson.duration &&
      iterLesson.hasOwnProperty("duration")
    )
      collision = true;
  });
  return collision;
}

export type LessonsOrLessonNotAssigned = {
  lesson: Lesson | ScheduleLessonNotAssigned;
  assigned: boolean;
};

export function lessonsWithDuration(
  lessons: LessonsOfDay
): LessonsOrLessonNotAssigned[] {
  let parsedLessons: LessonsOrLessonNotAssigned[] = [];
  let continuesCounter = 0;
  Object.values(lessons)
    .sort((l1, l2) => l1.hour - l2.hour)
    .forEach((lesson) => {
      if (--continuesCounter > 0) return;
      let assigned = lesson.hasOwnProperty("duration");
      if (assigned) continuesCounter = (lesson as Lesson).duration;
      parsedLessons.push({ lesson, assigned });
    });
  return parsedLessons;
}

const isString = (value: any): boolean => typeof value === "string";
const isNumber = (value: any): boolean => typeof value === "number";
const validDay = (day: string): boolean => days.includes(day as Days);
const validHour = (h: number): boolean => hours.includes(h as Hours);
const validDuration = (h: number, d: number) => h + d <= 22;

export function validateLesson(lesson: any): Lesson | null {
  const { day, hour, name, url, duration, color } = lesson;
  return isString(day) &&
    validDay(day) &&
    isString(name) &&
    isString(url) &&
    isNumber(hour) &&
    validHour(hour) &&
    isNumber(duration) &&
    validDuration(hour, duration) &&
    isString(color)
    ? { day, hour, name, url, duration, color: validateColor(color) }
    : null;
}
