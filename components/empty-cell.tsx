import { FC } from "react";
import styled from "styled-components";
import { Days, days, Hours, hours } from "../lib/schedule-utils";
import { StyledCell } from "./cell";

type Props = {
  hour: Hours;
  day: Days;
  onClick: (day: Days, hour: Hours) => void;
};

const EmptyCell: FC<Props> = ({ hour, day, onClick }) => {
  const dayIndex = days.indexOf(day) + 2;
  const hourIndex = hours.indexOf(hour) + 2;
  const style = { gridRow: `${hourIndex}`, gridColumn: `${dayIndex}` };
  return <StyledEmptyCell style={style} onClick={() => onClick(day, hour)} />;
};

const StyledEmptyCell = styled(StyledCell)`
  box-shadow: none !important;

  &:hover,
  &:focus,
  &:active {
    background-color: #b9b9b9;
    cursor: pointer;
  }
`;

export default EmptyCell;
