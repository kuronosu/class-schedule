import { CellContextMenuProps } from "../components/cell-context-menu";
import { Days, Hours, Lesson } from "../lib/schedule-utils";

export type SubReducer<T, S> = (prevState: S, payload: T) => S;

export type Actions<S> = {
  [action: string]: SubReducer<any, S>;
};

export type AddFormState = { day: Days; hour: Hours; visible: boolean };

export type EditFormState = { lesson?: Lesson; visible: boolean };

export type ContextMenuState = {
  xPos: number;
  yPos: number;
  visible: boolean;
  lesson?: Lesson;
};

export type StorageState = {
  loading: boolean;
  successful: boolean;
};

export type AppConfig = {
  is12: boolean;
  addForm: AddFormState;
  editForm: EditFormState;
  contextMenu: ContextMenuState;
  save: StorageState;
};

export const defaultStorageState: StorageState = {
  loading: false,
  successful: true,
};

export const defaultAddFormState: AddFormState = {
  day: "MON",
  hour: 7,
  visible: false,
};

export const defaultEditFormState: EditFormState = { visible: false };

export const defaultContextMenuState: ContextMenuState = {
  xPos: 0,
  yPos: 0,
  visible: false,
};
