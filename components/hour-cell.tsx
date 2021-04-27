import { FC } from "react";
import styled from "styled-components";
import { formatHour } from "../lib/time";

type HourCellProps = {
  hour: number;
  is12: boolean;
};

const HourCell: FC<HourCellProps> = ({ hour, is12 }) => (
  <StyledHourCell style={{ gridRow: hour - 5 }}>
    {`${formatHour(hour, is12)} - ${formatHour(hour + 1, is12)}`}
  </StyledHourCell>
);

const StyledHourCell = styled.span`
  grid-column: 1;
  border-bottom: 1px solid rgba(166, 168, 179, 0.12);
  border-right: 1px solid rgba(166, 168, 179, 0.12);
  text-align: right;
  padding: 14px 20px;
  letter-spacing: 1px;
  font-size: 12px;
  box-sizing: border-box;
  color: #98a0a6;
  position: relative;
  pointer-events: none;
`;

export default HourCell;
