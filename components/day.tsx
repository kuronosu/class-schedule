import { Dispatch, FC } from "react";
import Cell from "./cell";
import EmptyCell from "./empty-cell";
import { showContextMenu } from "../reducer/actions";
import {
  Days,
  Hours,
  Lesson,
  LessonsOfDay,
  lessonsWithDuration,
} from "../lib/schedule-utils";

type DayProps = {
  lessons: LessonsOfDay;
  dispatch: Dispatch<any>;
  onEmptyCellClicked: (day: Days, hour: Hours) => void;
};

const Day: FC<DayProps> = ({ lessons, dispatch, onEmptyCellClicked }) => (
  <>
    {lessonsWithDuration(lessons).map(({ assigned, lesson }) =>
      assigned ? (
        <Cell
          handleContextMenu={(e, lesson) => {
            e.preventDefault();
            dispatch(showContextMenu(e.pageX, e.pageY, lesson));
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

export default Day;
