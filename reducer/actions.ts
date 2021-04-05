import {
  AddFormState,
  ContextMenuState,
  defaultAddFormState,
  defaultContextMenuState,
  defaultEditFormState,
  EditFormState,
} from ".";
import { Days, Hours, Lesson } from "../lib/schedule-utils";

export type Action<T> = { type: string; payload: T };

export const addLessonAction = "ADD_LESSON";
export type addLessonAction = Action<Lesson>;

export const editLessonAction = "EDIT_LESSON";
export type editLessonAction = Action<Lesson>;

export const removeLessonAction = "REMOVE_LESSON";
export type removeLessonAction = Action<Lesson>;

export const toggleAddFormAction = "TOGGLE_ADD_FORM";
export type toggleAddFormAction = Action<AddFormState>;

export const toggleEditFormAction = "TOGGLE_EDIT_FORM";
export type toggleEditFormAction = Action<EditFormState>;

export const toggleContextMenuAction = "TOGGLE_CONTEXT_MENU";
export type toggleContextMenuAction = Action<ContextMenuState>;

export const addLesson = (lesson: Lesson): addLessonAction => ({
  type: addLessonAction,
  payload: lesson,
});

export const removeLesson = (lesson: Lesson): removeLessonAction => ({
  type: removeLessonAction,
  payload: lesson,
});

export const showAddForm = (day: Days, hour: Hours): toggleAddFormAction => ({
  type: toggleAddFormAction,
  payload: { day, hour, visible: true },
});

export const hideAddForm = (): toggleAddFormAction => ({
  type: toggleAddFormAction,
  payload: defaultAddFormState,
});

export const showEditForm = (lesson: Lesson): toggleEditFormAction => ({
  type: toggleEditFormAction,
  payload: { lesson, visible: true },
});

export const hideEditForm = (): toggleEditFormAction => ({
  type: toggleEditFormAction,
  payload: defaultEditFormState,
});

export const showContextMenu = (
  xPos: number,
  yPos: number,
  lesson: Lesson
): toggleContextMenuAction => ({
  type: toggleContextMenuAction,
  payload: { xPos, yPos, visible: true, lesson },
});

export const hideContextMenu = (): toggleContextMenuAction => ({
  type: toggleContextMenuAction,
  payload: defaultContextMenuState,
});

export const editLesson = (lesson: Lesson): editLessonAction => ({
  type: editLessonAction,
  payload: lesson,
});
