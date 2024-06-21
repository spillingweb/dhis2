import { useEffect, useState } from "react";

function getStarredDashboards(): string[] {
  const starred = localStorage.getItem("starredDashboards");
  if (starred) {
    const starredDashboards: string[] = JSON.parse(starred);
    return starredDashboards;
  }
  return [];
}

export default function useLocalStorage(): [string[], React.Dispatch<React.SetStateAction<string[]>>] {
  const [starredDashboards, setStarredDashboards] =
    useState<string[]>(getStarredDashboards);

  useEffect(() => {
    if (starredDashboards.length > 0) {
      localStorage.setItem(
        "starredDashboards",
        JSON.stringify(starredDashboards)
      );
    } else {
      localStorage.removeItem("starredDashboards");
    }
  }, [starredDashboards]);

  return [starredDashboards, setStarredDashboards];
}
