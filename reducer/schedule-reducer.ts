import { Actions } from ".";
import {
  validateLessonToAdd,
  initialSchedule,
  Lesson,
  Schedule,
} from "../lib/schedule-utils";
import {
  Action,
  addLessonAction,
  editLessonAction,
  removeLessonAction,
  setScheduleAction,
} from "./actions";

export function setScheduleReducer(_: Schedule, schedule: Schedule): Schedule {
  return { ...schedule };
}

export function addLessonReducer(schedule: Schedule, payload: Lesson) {
  if (!validateLessonToAdd(schedule, payload)[0]) return schedule;
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
  [setScheduleAction]: setScheduleReducer,
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
