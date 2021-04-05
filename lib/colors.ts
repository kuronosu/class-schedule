export enum Color {
  Red = "#ef9a9a",
  Pink = "#f48fb1",
  Purple = "#ce93d8",
  DeepPurple = "#b39ddb",
  Indigo = "#9fa8da",
  Blue = "#90caf9",
  LightBlue = "#81d4fa",
  Cyan = "#80deea",
  Teal = "#80cbc4",
  Green = "#a5d6a7",
  LightGreen = "#c5e1a5",
  Lime = "#e6ee9c",
  Yellow = "#fff59d",
  Amber = "#ffe082",
  Orange = "#ffcc80",
  DeepOrange = "#ffab91",
  Brown = "#bcaaa4",
  Grey = "#eeeeee",
  BlueGrey = "#b0bec5",
}

export const defaultColorName = "Grey";
export const defaultColor: Color = Color.Grey;

function limit(num: number): number {
  if (num > 255) return 255;
  else if (num < 0) return 0;
  return num;
}

export function ChangeColorLight(col: string, amt: number) {
  let usePound = false;
  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col, 16);
  let r = limit((num >> 16) + amt);
  let b = limit(((num >> 8) & 0x00ff) + amt);
  let g = limit((num & 0x0000ff) + amt);
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
  myEnum: T,
  enumValue: string
): keyof T | null {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : null;
}

export function validateColor(color: string): Color {
  return Color[getEnumKeyByEnumValue(Color, color) || defaultColorName];
}
