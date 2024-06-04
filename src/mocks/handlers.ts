import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(
    "https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json",
    () => {
      return HttpResponse.json({
        dashboards: [
          {
            displayName: "Mocked dashboard",
            id: "someId",
            starred: false,
          },
        ],
      });
    }
  ),
  http.get(
    "https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/someId.json",
    () => {
      return HttpResponse.json({
        dashboardItems: [
          {
            id: "someIdAgain",
            type: "VISUALIZATION",
            visualization: {
              name: "Mocked dashboardDetails",
            },
          },
        ],
      });
    }
  ),
];
