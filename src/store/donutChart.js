import { defineStore } from "pinia";
export const donutChartInfo = defineStore("donutChart", {
  state: () => {
    return {
      chartOptions: [
        {
          chartRatio: undefined,
          legend: {
            bottom: 0,
          },
          chartData: [
            {
              name: "order",
              value: 10999,
              percent: "94%",
              color: "#b5deffbd",
              label: "order",
            },
            {
              name: "catalog",
              value: 500,
              percent: "6%",
              color: "#dbffb5bd",
              label: "catalog",
            },
          ],
        },
        {
          chartRatio: undefined,
          legend: {
            bottom: 0,
          },
          chartData: [
            {
              name: "order",
              value: 12000,
              percent: "93%",
              color: "#b5deffbd",
              label: "order",
            },
            {
              name: "catalog",
              value: 522,
              percent: "7%",
              color: "#dbffb5bd",
              label: "catalog",
            },
          ],
        },
        {
          chartRatio: undefined,
          legend: {
            bottom: 0,
          },
          chartData: [
            {
              name: "order",
              value: 1444,
              percent: "80%",
              color: "#b5deffbd",
              label: "order",
            },
            {
              name: "catalog",
              value: 522,
              percent: "20%",
              color: "#dbffb5bd",
              label: "catalog",
            },
          ],
        },
      ],
    };
  },
  getters: {
    valueRatios: (state) => {
      let pieChart = [];
      let kpiChart = [];
      state.chartOptions.forEach((option) => {
        console.log("option.chartData", option.chartData)
        const values = option.chartData.map((data) => data.value);
        console.log("values", values)
        for (let i = 0; i < values.length - 1; i++) {
          const ratio = values[i] / values[i + 1];
          option.chartRatio = ratio;
          if (ratio >= 20.8 && ratio <= 80.2) {
            pieChart.push(option);
          } else {
            kpiChart.push(option);
          }
        }
      });

      return { pieChart, kpiChart };
    },
  },
});
