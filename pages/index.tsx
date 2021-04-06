import { useEffect, useReducer } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import ScheduleComponent from "../components/schedule";
import { initialSchedule } from "../lib/schedule-utils";
import {
  addLesson,
  editLesson,
  hideAddForm,
  hideContextMenu,
  hideEditForm,
  removeLesson,
  showAddForm,
  showEditForm,
} from "../reducer/actions";
import Modal from "../components/modal";
import AddForm from "../components/add-form";
import scheduleReducer from "../reducer/lesson-reducers";
import configReducer, { initialConfig } from "../reducer/config-reducers";
import CellContextMenu from "../components/cell-context-menu";
import EditForm from "../components/edit-form";
import { load, save } from "../lib/storage";

// import lessons from '../schedule.json'

// const loadJson = (): Lesson[] =>{
//   console.log(lessons.map((l) => validateLessonToLoad(l)).filter((el) => el !== null))
//   return lessons.map((l) => validateLessonToLoad(l)).filter((el) => el !== null);
// }

export default function Home() {
  const [schedule, scheduleDispatch] = useReducer(
    scheduleReducer,
    initialSchedule
  );
  const [config, configDispatch] = useReducer(configReducer, initialConfig);

  const mangeClick = () => {
    if (config.contextMenu.visible) return configDispatch(hideContextMenu());
  };

  useEffect(() => {
    load().forEach((el) => scheduleDispatch(addLesson(el)));
  }, []);

  useEffect(() => {
    document.addEventListener("click", mangeClick);
    return () => document.removeEventListener("click", mangeClick);
  }, [config.contextMenu.visible]);

  return (
    <Layout>
      <Head>
        <title>Class Schedule</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Add lesson modal */}
      <Modal
        onClose={() => configDispatch(hideAddForm())}
        show={config.addForm.visible}
      >
        <AddForm
          day={config.addForm.day}
          hour={config.addForm.hour}
          is12={config.is12}
          schedule={schedule}
          onOK={(lesson) => {
            configDispatch(hideAddForm());
            scheduleDispatch(addLesson(lesson));
          }}
        />
      </Modal>

      {/* Edit lesson modal */}
      <Modal
        onClose={() => configDispatch(hideEditForm())}
        show={config.editForm.visible}
      >
        <EditForm
          {...config.editForm}
          is12={config.is12}
          onOK={(lesson) => {
            scheduleDispatch(editLesson(lesson));
            configDispatch(hideEditForm());
          }}
        />
      </Modal>

      {config.contextMenu.visible && (
        <CellContextMenu
          onEdit={() =>
            config.contextMenu.lesson &&
            configDispatch(showEditForm(config.contextMenu.lesson))
          }
          onDelete={() =>
            config.contextMenu.lesson &&
            scheduleDispatch(removeLesson(config.contextMenu.lesson))
          }
          {...config.contextMenu}
        />
      )}

      <ScheduleComponent
        onEmptyCellClicked={(d, h) => configDispatch(showAddForm(d, h))}
        scheduleDispatch={scheduleDispatch}
        configDispatch={configDispatch}
        schedule={schedule}
        is12={config.is12}
      />
    </Layout>
  );
}
