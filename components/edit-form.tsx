import { FC, useState } from "react";
import { Color, validateColor } from "../lib/colors";
import { Lesson } from "../lib/schedule-utils";
import { getErrorMessage, errors } from "../lib/errors";
import { formatHour } from "../lib/time";
import { EditFormState } from "../reducer";
import {
  StyledColorContainer,
  StyledColorRadio,
  StyledConfirmButton,
  StyledFormContainer,
  StyledFormTitle,
  StyledInputContainer,
  StyledInputField,
  StyledInputLabel,
  StyledSmallError,
} from "./add-form";

type EditFormProps = EditFormState & {
  onOK: (lesson: Lesson) => void;
  is12: boolean;
};

const EditForm: FC<EditFormProps> = ({ lesson, is12, onOK }) => {
  if (lesson) {
    const [name, setName] = useState(lesson.name);
    const [link, setLink] = useState(lesson.url);
    const [color, setColor] = useState(lesson.color);
    const [error, setError] = useState("");
    return (
      <StyledFormContainer>
        <StyledFormTitle>
          {lesson.day} {formatHour(lesson.hour, is12)} -{" "}
          {formatHour(lesson.hour + lesson.duration, is12)}
        </StyledFormTitle>

        {error && <StyledSmallError>{getErrorMessage(error)}</StyledSmallError>}

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
            if (name.slice() == "") setError(errors.INVALID_HOUR_ERROR);
            else
              onOK({
                day: lesson.day,
                hour: lesson.hour,
                name: name.slice(),
                url: link.slice(),
                duration: lesson.duration,
                color: validateColor(color),
              });
          }}
        >
          Save
        </StyledConfirmButton>
      </StyledFormContainer>
    );
  }
  return null;
};

export default EditForm;
