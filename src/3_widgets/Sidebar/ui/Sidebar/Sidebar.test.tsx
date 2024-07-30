import { fireEvent, screen } from "@testing-library/react";
import { Sidebar } from "3_widgets/Sidebar/ui/Sidebar/Sidebar";
import { componentRender } from "6_shared/config/tests/componentRouter/componentRender";

describe("Sidebar", () => {
  test("with only first param", () => {
    componentRender(<Sidebar />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  test("test toggle", () => {
    componentRender(<Sidebar />);
    const toggleBtn = screen.getByTestId("sidebar-toggle");
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");
  });
});
