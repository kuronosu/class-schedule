import { Dispatch, FC, useEffect } from "react";
import Cell from "./cell";
import HourCell from "./hour-cell";
import EmptyCell from "./empty-cell";
import {
  Schedule,
  LessonsOfDay,
  days,
  hours,
  lessonsWithDuration,
  Lesson,
  Hours,
  Days,
} from "../lib/schedule-utils";
import styles from "./schedule.module.css";
import { showContextMenu, hideContextMenu } from "../reducer/actions";

export type ScheduleProps = {
  is12?: boolean;
  schedule: Schedule;
  scheduleDispatch: Dispatch<any>;
  configDispatch: Dispatch<any>;
  onEmptyCellClicked: (day: Days, hour: Hours) => void;
};

type DayProps = { lessons: LessonsOfDay };

const ScheduleComponent: FC<ScheduleProps> = function ({
  schedule,
  is12 = true,
  onEmptyCellClicked,
  configDispatch,
}) {
  const Day: FC<DayProps> = ({ lessons }) => (
    <>
      {lessonsWithDuration(lessons).map(({ assigned, lesson }) =>
        assigned ? (
          <Cell
            handleContextMenu={(e, lesson) => {
              e.preventDefault();
              configDispatch(showContextMenu(e.pageX, e.pageY, lesson));
            }}
            lesson={lesson as Lesson}
            key={`${lesson.day}${lesson.hour}`}
          />
        ) : (
          <EmptyCell
            key={`${lesson.day}-${lesson.hour}`}
            hour={lesson.hour}
            day={lesson.day}
            onClick={onEmptyCellClicked}
          />
        )
      )}
    </>
  );

  return (
    <div className={styles.scheduleContainer}>
      <div className={styles.schedule}>
        <span className={`${styles.hour} .row-1 .column-1`} />
        {days.map((day, dn) => (
          <span key={day} className={`${styles.day} .row-1 .column-${dn + 2}`}>
            {day}
          </span>
        ))}
        {hours.map((hour) => (
          <HourCell key={hour} hour={hour} is12={is12} />
        ))}
        <Day lessons={schedule.MON} />
        <Day lessons={schedule.TUE} />
        <Day lessons={schedule.WED} />
        <Day lessons={schedule.THU} />
        <Day lessons={schedule.FRI} />
        <Day lessons={schedule.SAT} />
      </div>
    </div>
  );
};
export default ScheduleComponent;
