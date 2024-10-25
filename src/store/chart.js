import { defineStore } from "pinia";
export const chartInfo = defineStore("chart", {
  state: () => {
    return {
      chartOptions: [
        {
          category: ["UAE", "IRR", "IRQ"],
          legend: {
            data: ["order", "catalog"],
            bottom: 60,
          },
          chartData: [
            { name: "order", data: [12, 32, 48] },
            { name: "catalog", data: [18, 23, 10] },
          ],
        },
        {
          category: ["UAE", "IRR", "IRQ", "CN", "GR", "USA"],
          legend: {
            data: ["order", "catalog"],
            bottom: 60,
          },
          chartData: [
            {
              name: "order",
              data: [12, 32, 48, 17, 65, 124],
            },
            {
              name: "catalog",
              data: [18, 23, 10, 14, 53, 87],
            },
          ],
        },
        {
          category: [
            "UAE",
            "IRR",
            "IRQ",
            "CN",
            "GR",
            "USA",
            "MC",
            "FR",
            "JN",
            "EG",
            "SP",
            "RUS",
            "ES",
            "PR",
            "NKR",
            "SKR",
            "IT",
          ],
          legend: {
            data: ["order", "catalog"],
            bottom: 60,
          },
          chartData: [
            {
              name: "order",
              data: [
                12, 32, 48, 17, 65, 124, 65, 35, 70, 52, 81, 16, 72, 16, 62,
                112, 101,
              ],
            },
            {
              name: "catalog",
              data: [
                18, 23, 10, 14, 53, 87, 71, 13, 48, 86, 90, 10, 100, 25, 81, 15,
                38,
              ],
            },
          ],
        },
      ],
    };
  },
});
