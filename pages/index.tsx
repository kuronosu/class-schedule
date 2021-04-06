import { Dispatch, useEffect, useReducer, useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import ScheduleComponent from "../components/schedule";
import { initialSchedule, Lesson, Schedule } from "../lib/schedule-utils";
import {
  Action,
  addLesson,
  editLesson,
  hideAddForm,
  hideContextMenu,
  hideEditForm,
  loadSchedule,
  removeLesson,
  saveError,
  saveSuccessful,
  scheduleLoadFinished,
  setSchedule,
  showAddForm,
  showEditForm,
  startSaving,
} from "../reducer/actions";
import Modal from "../components/modal";
import AddForm from "../components/add-form";
import scheduleReducer, {
  addLessonReducer,
  editLessonReducer,
  removeLessonReducer,
} from "../reducer/schedule-reducer";
import configReducer, { initialConfig } from "../reducer/config-reducer";
import CellContextMenu from "../components/cell-context-menu";
import EditForm from "../components/edit-form";
import { useSession } from "next-auth/client";
import { Repository } from "../lib/storage";
import { Session } from "next-auth";

// import lessons from '../schedule.json'

// const loadJson = (): Lesson[] =>{
//   console.log(lessons.map((l) => validateLessonToLoad(l)).filter((el) => el !== null))
//   return lessons.map((l) => validateLessonToLoad(l)).filter((el) => el !== null);
// }

const save = async (
  session: Session | null | undefined,
  schedule: Schedule,
  lesson: Lesson,
  reducer: (schedule: Schedule, lesson: Lesson) => Schedule,
  dispath: Dispatch<Action<any>>
) => {
  dispath(startSaving());
  Repository(session)
    .save(reducer(schedule, lesson))
    .then(() => dispath(saveSuccessful()))
    .catch(() => dispath(saveError()));
};

export default function Home() {
  const [session, _] = useSession();
  const [schedule, scheduleDispatch] = useReducer(
    scheduleReducer,
    initialSchedule
  );
  const [config, configDispatch] = useReducer(configReducer, initialConfig);

  const mangeClick = () => {
    if (config.contextMenu.visible) return configDispatch(hideContextMenu());
  };

  useEffect(() => {
    configDispatch(loadSchedule());
    Repository(session)
      .load()
      .then((loadedSchedule) => {
        if (loadedSchedule) {
          scheduleDispatch(setSchedule(loadedSchedule));
          configDispatch(scheduleLoadFinished());
        }
      })
      .catch(() => configDispatch(scheduleLoadFinished()));
  }, [session]);

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
            save(session, schedule, lesson, addLessonReducer, configDispatch);
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
            save(session, schedule, lesson, editLessonReducer, configDispatch);
          }}
        />
      </Modal>

      {config.contextMenu.visible && (
        <CellContextMenu
          onEdit={() =>
            config.contextMenu.lesson &&
            configDispatch(showEditForm(config.contextMenu.lesson))
          }
          onDelete={() => {
            if (config.contextMenu.lesson) {
              scheduleDispatch(removeLesson(config.contextMenu.lesson));
              save(
                session,
                schedule,
                config.contextMenu.lesson,
                removeLessonReducer,
                configDispatch
              );
            }
          }}
          {...config.contextMenu}
        />
      )}

      <ScheduleComponent
        schedule={schedule}
        is12={config.is12}
        storage={config.save}
        onEmptyCellClicked={(d, h) => configDispatch(showAddForm(d, h))}
        scheduleDispatch={scheduleDispatch}
        configDispatch={configDispatch}
      />
    </Layout>
  );
}
