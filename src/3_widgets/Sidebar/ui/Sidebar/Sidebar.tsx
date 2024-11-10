import { memo, useMemo, useState } from "react";

import { ToggleFeatures } from "@/6_shared/lib/features";

import { useSidebarItems } from "../../model/selectors/getSidebarItems/getSidebarItems";
import SidebarDeprecated from "../SidebarDeprecated/SidebarDeprecated";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import SidebarRedesign from "../SidebarRedesign/SidebarRedesign";

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSidebarItems();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem
          item={item}
          collapsed={collapsed}
          key={item.path}
        />
      )),
    [collapsed, sidebarItemsList],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <SidebarRedesign collapsed={collapsed} itemsList={itemsList} onToggle={onToggle} />
      }
      off={
        <SidebarDeprecated collapsed={collapsed} itemsList={itemsList} onToggle={onToggle} />
      }
    />
  );
});
