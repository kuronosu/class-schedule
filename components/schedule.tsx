import { Dispatch, FC } from "react";
import styled from "styled-components";
import Day from "./day";
import HourCell from "./hour-cell";
import { Schedule, days, hours, Hours, Days } from "../lib/schedule-utils";
import { StorageState } from "../reducer";

export type ScheduleProps = {
  is12: boolean;
  schedule: Schedule;
  storage: StorageState;
  scheduleDispatch: Dispatch<any>;
  configDispatch: Dispatch<any>;
  onEmptyCellClicked: (day: Days, hour: Hours) => void;
};

const ScheduleComponent: FC<ScheduleProps> = function ({
  schedule,
  is12,
  storage,
  onEmptyCellClicked,
  configDispatch,
}) {
  return (
    <StyleScheduleContainer>
      <StyleSchedule>
        <StyledSave>
          {storage.load.inProgress
            ? "Loading"
            : storage.save.inProgress
            ? "Saving"
            : storage.save.successful
            ? "Save successful"
            : "Save failed"}
        </StyledSave>
        {days.map((day, dn) => (
          <StyledDay
            key={day}
            style={{ gridColumn: dn + 2 }}
          >
            {day}
          </StyledDay>
        ))}
        {hours.map((hour) => (
          <HourCell key={hour} hour={hour} is12={is12} />
        ))}
        <Day
          lessons={schedule.MON}
          dispatch={configDispatch}
          onEmptyCellClicked={onEmptyCellClicked}
        />
        <Day
          lessons={schedule.TUE}
          dispatch={configDispatch}
          onEmptyCellClicked={onEmptyCellClicked}
        />
        <Day
          lessons={schedule.WED}
          dispatch={configDispatch}
          onEmptyCellClicked={onEmptyCellClicked}
        />
        <Day
          lessons={schedule.THU}
          dispatch={configDispatch}
          onEmptyCellClicked={onEmptyCellClicked}
        />
        <Day
          lessons={schedule.FRI}
          dispatch={configDispatch}
          onEmptyCellClicked={onEmptyCellClicked}
        />
        <Day
          lessons={schedule.SAT}
          dispatch={configDispatch}
          onEmptyCellClicked={onEmptyCellClicked}
        />
      </StyleSchedule>
    </StyleScheduleContainer>
  );
};
export default ScheduleComponent;

const StyleScheduleContainer = styled.div`
  width: 100%;
  margin: auto;
  overflow: hidden;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #fff;
  transition: all 0.2s ease;
`;

const StyleSchedule = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, minmax(120px, 1fr));
  grid-template-rows: 50px;
  grid-auto-rows: 50px;
  overflow: auto;
`;

const StyledDay = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  color: #99a1a7;
  text-align: center;
  border-bottom: 1px solid rgba(166, 168, 179, 0.12);
  line-height: 50px;
  font-weight: 500;
  grid-row: 1;
`;

const StyledSave = styled.span`
  border-bottom: 1px solid rgba(166, 168, 179, 0.12);
  border-right: 1px solid rgba(166, 168, 179, 0.12);
  text-align: end;
  padding: 14px 20px;
  letter-spacing: 1px;
  color: #98a0a6;
  position: relative;
  pointer-events: none;
  grid-row: 1;
  grid-column: 1;
`;
