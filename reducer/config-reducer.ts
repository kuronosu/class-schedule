import {
  Actions,
  AddFormState,
  AppConfig,
  ContextMenuState,
  defaultAddFormState,
  defaultContextMenuState,
  defaultEditFormState,
  EditFormState,
  defaultStorageState,
  StorageState,
} from ".";
import {
  Action,
  setSaveStateAction,
  toggleAddFormAction,
  toggleContextMenuAction,
  toggleEditFormAction,
} from "./actions";

export const initialConfig: AppConfig = {
  is12: true,
  addForm: defaultAddFormState,
  editForm: defaultEditFormState,
  contextMenu: defaultContextMenuState,
  save: defaultStorageState,
};

function toggleEditFormReducer(
  prevState: AppConfig,
  payload: EditFormState
): AppConfig {
  return { ...prevState, editForm: { ...payload } };
}

function toggleAddFormReducer(
  prevState: AppConfig,
  payload: AddFormState
): AppConfig {
  return { ...prevState, addForm: { ...payload } };
}

function toggleContextMenuReducer(
  prevState: AppConfig,
  payload: ContextMenuState
): AppConfig {
  return { ...prevState, contextMenu: { ...payload } };
}

function setSaveStateReducer(
  prevState: AppConfig,
  payload: StorageState
): AppConfig {
  return { ...prevState, save: { ...payload } };
}

const configActions: Actions<AppConfig> = {
  [toggleAddFormAction]: toggleAddFormReducer,
  [toggleEditFormAction]: toggleEditFormReducer,
  [toggleContextMenuAction]: toggleContextMenuReducer,
  [setSaveStateAction]: setSaveStateReducer,
  default: (prevState: AppConfig) => prevState,
};

export default function configReducer(
  prevState: AppConfig = initialConfig,
  { type, payload }: Action<any>
) {
  return (configActions[type] || configActions["default"])(prevState, payload);
}
