import { screen } from "@testing-library/react";
import { Profile } from "5_entities/Profile";
import { Currency } from "5_entities/Currency";
import { Country } from "5_entities/Country";
import userEvent from "@testing-library/user-event";
import { $api } from "6_shared/api/api";
import { Age } from "5_entities/Age";
import { componentRender } from "6_shared/config/tests/componentRouter/componentRender";
import { profileReducer } from "../../model/slice/profileSlice";
import { EditableProfileCard } from "./EditableProfileCard";

const profile: Profile = {
  id: "1",
  name: "admin",
  lastname: "admin",
  age: Age.Age21,
  currency: Currency.USD,
  country: Country.AF,
  city: "Moscow",
  username: "admin213",
};

const options = {
  initialState: {
    profile: {
      readOnly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: { id: "1", username: "admin" },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

// TODO fix any
describe("features/EditableProfileCard", () => {
  test("Режим рид онли должен переключиться", async () => {
    componentRender(<EditableProfileCard id="1" />, options as any);
    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"));
    expect(screen.getByTestId("EditableProfileCardHeader.CancelButton")).toBeInTheDocument();
  });

  test("При отмене значения должны обнуляться", async () => {
    componentRender(<EditableProfileCard id="1" />, options as any);
    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"));

    await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));
    await userEvent.clear(screen.getByTestId("ProfileCard.lastname"));

    await userEvent.type(screen.getByTestId("ProfileCard.firstname"), "user");
    await userEvent.type(screen.getByTestId("ProfileCard.lastname"), "user");

    expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("user");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("user");

    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.CancelButton"));

    expect(screen.getByTestId("ProfileCard.firstname")).toHaveValue("admin");
    expect(screen.getByTestId("ProfileCard.lastname")).toHaveValue("admin");
  });

  test("Должна появиться ошибка", async () => {
    componentRender(<EditableProfileCard id="1" />, options as any);
    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"));

    await userEvent.clear(screen.getByTestId("ProfileCard.firstname"));

    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.SaveButton"));

    expect(screen.getByTestId("EditableProfileCard.Error.Paragraph")).toBeInTheDocument();
  });

  test("Если нет ошибок валидации, то на сервер должен уйти PUT запрос", async () => {
    const mockPutReq = jest.spyOn($api, "put");
    componentRender(<EditableProfileCard id="1" />, options as any);
    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"));

    await userEvent.type(screen.getByTestId("ProfileCard.firstname"), "user");

    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.SaveButton"));

    expect(mockPutReq).toHaveBeenCalled();
  });
});
