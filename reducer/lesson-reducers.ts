import { Actions } from ".";
import {
  initialSchedule,
  isOverlap,
  Lesson,
  Schedule,
} from "../lib/schedule-utils";
import {
  Action,
  addLessonAction,
  editLesson,
  editLessonAction,
  removeLessonAction,
} from "./actions";
// SubReducer<Lesson>
export function addLessonReducer(schedule: Schedule, payload: Lesson) {
  if (
    isOverlap(schedule, payload) ||
    payload.hour < 7 ||
    payload.hour > 20 ||
    payload.hour + payload.duration > 21
  )
    return schedule;
  return {
    ...schedule,
    [payload.day]: { ...schedule[payload.day], [payload.hour]: payload },
  };
}

export function editLessonReducer(schedule: Schedule, payload: Lesson) {
  return {
    ...schedule,
    [payload.day]: {
      ...schedule[payload.day],
      [payload.hour]: { ...payload },
    },
  };
}

export function removeLessonReducer(schedule: Schedule, payload: Lesson) {
  return {
    ...schedule,
    [payload.day]: {
      ...schedule[payload.day],
      [payload.hour]: { day: payload.day, hour: payload.hour },
    },
  };
}

const scheduleActions: Actions<Schedule> = {
  [addLessonAction]: addLessonReducer,
  [editLessonAction]: editLessonReducer,
  [removeLessonAction]: removeLessonReducer,
  default: (prevState: Schedule) => prevState,
};

export default function scheduleReducer(
  prevState: Schedule = initialSchedule,
  { type, payload }: Action<any>
) {
  return (scheduleActions[type] || scheduleActions["default"])(
    prevState,
    payload
  );
}
