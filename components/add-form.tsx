import { FC, useState } from "react";
import styled from "styled-components";
import { Color, validateColor, defaultColor } from "../lib/colors";
import { Days, Hours, Lesson } from "../lib/schedule-utils";
import { formatHour } from "../lib/time";

type AddFormProps = {
  day: Days;
  hour: Hours;
  is12: boolean;
  onOK: (lesson: Lesson) => void;
};

const AddForm: FC<AddFormProps> = ({ day, hour, is12, onOK }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(1);
  const [link, setLink] = useState("");
  const [color, setColor] = useState(defaultColor);

  useState();
  return (
    <StyledFormContainer>
      <StyledFormTitle>
        {day} {formatHour(hour, is12)} - {formatHour(hour + duration, is12)}
      </StyledFormTitle>

      <StyledInputContainer>
        <StyledInputField
          type="text"
          placeholder="Name"
          name="name"
          id="name"
          required={true}
          onChange={(e) => setName(e.target.value)}
          maxLength={30}
          value={name}
        ></StyledInputField>
        <StyledInputLabel htmlFor="name">Name</StyledInputLabel>
      </StyledInputContainer>

      <StyledInputContainer>
        <StyledInputField
          type="number"
          placeholder="Duration"
          name="duration"
          id="duration"
          required={true}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          value={duration}
          min={1}
        ></StyledInputField>
        <StyledInputLabel htmlFor="duration">Duration</StyledInputLabel>
      </StyledInputContainer>

      <StyledInputContainer>
        <StyledInputField
          type="url"
          placeholder="Link"
          name="link"
          id="link"
          required={true}
          onChange={(e) => setLink(e.target.value)}
          value={link}
        ></StyledInputField>
        <StyledInputLabel htmlFor="link">Link</StyledInputLabel>
      </StyledInputContainer>

      <StyledColorContainer>
        {Object.entries(Color).map(([name, hex]) => (
          <StyledColorRadio
            key={name}
            type="radio"
            name="color"
            onChange={() => setColor(hex)}
            className={name}
            checked={hex == color}
          />
        ))}
      </StyledColorContainer>

      <StyledConfirmButton
        onClick={() => {
          if (name.slice() == "" || link.slice() == "" || duration <= 0) return;
          onOK({
            day,
            hour,
            name: name.slice(),
            url: link.slice(),
            duration,
            color: validateColor(color),
          });
        }}
      >
        Save
      </StyledConfirmButton>
    </StyledFormContainer>
  );
};

export default AddForm;

export const StyledFormContainer = styled.div`
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 25px;
`;

export const StyledFormTitle = styled.span`
  text-align: center;
`;

export const StyledInputContainer = styled.div`
  position: relative;
  padding: 15px 0 0;
  width: 70%;
  margin: 10px auto 0px auto;
`;

export const StyledInputLabel = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #9b9b9b;
`;

export const StyledInputField = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }
  &:placeholder-shown ~ ${StyledInputLabel} {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }
  &:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #11998e, #38ef7d);
    border-image-slice: 1;
  }

  &:focus ~ ${StyledInputLabel} {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #11998e;
    font-weight: 700;
  }
`;

export const StyledColorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
  flex-direction: row;
  width: 70%;
  margin: 0 auto;
`;

export const StyledColorRadio = styled.input`
  width: 30px;
  height: 30px;
  border: none;
  margin: 5px;

  &:after {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    top: 0px;
    left: 0px;
    content: "";
    position: relative;
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
  }

  &:checked:after {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    top: 0px;
    left: 0px;
    position: relative;
    content: "";
    display: inline-block;
    visibility: visible;
    border: 2px solid #3b3b3b;
    box-sizing: border-box;
  }
`;

export const StyledConfirmButton = styled.button`
  width: 70%;
  font-family: inherit;
  margin: 10px auto 0px auto;
  font-size: 1.3rem;
`;
