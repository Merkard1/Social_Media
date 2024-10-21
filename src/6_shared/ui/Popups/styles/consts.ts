import cls from "./popup.module.scss";

export enum DropdownDirection {
  TL = "top left",
  TR = "top right",
  BL = "bottom left",
  BR = "bottom right",
}

export const mapDirectionClass: Record<DropdownDirection, string> = {
  [DropdownDirection.BL]: cls.optionsBottomLeft,
  [DropdownDirection.BR]: cls.optionsBottomRight,
  [DropdownDirection.TR]: cls.optionsTopRight,
  [DropdownDirection.TL]: cls.optionsTopLeft,
};
