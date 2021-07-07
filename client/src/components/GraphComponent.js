import React from "react";
import Chart from "react-apexcharts";

const GraphComponent = ({ scores }) => {
  let data2 = [0, 0, 0, 0, 0, 0];

  for (let i = 0; i < scores.length; i++) {
    var x = Number(scores[i]);
    if (x < 50) {
      data2[0] += 1;
    } else if (x >= 50 && x < 65) {
      data2[1] += 1;
    } else if (x >= 65 && x < 70) {
      data2[2] += 1;
    } else if (x >= 70 && x < 75) {
      data2[3] += 1;
    } else if (x >= 75 && x < 80) {
      data2[4] += 1;
    } else if (x >= 80 && x < 100) {
      data2[5] += 1;
    }
  }

  let averageScore = 0;
  for (var i in scores) {
    averageScore += Number(scores[i]);
  }
  averageScore = averageScore / scores.length;

  let averageScoreRounded = averageScore.toFixed(2);

  const data = {
    options: {
      chart: {
        id: "rangeBar",
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "< 50 (F)",
          "50-64(P)",
          "64-69(H3)",
          "70-74(H2B)",
          "75-79(H2A)",
          "80-100(H1)",
        ],
        title: {
          text: "Grade",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: "rgb(23, 42, 69)",
            fontSize: "16px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-title",
          },
        },
      },
      yaxis: {
        title: {
          text: "No. of Students",
          style: {
            color: "rgb(23, 42, 69)",
            fontSize: "15px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            cssClass: "apexcharts-xaxis-title",
          },
        },
      },
      fill: {
        colors: ["rgb(23, 42, 69)"],
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              width: "90%",
              height: "90%",
            },

            legend: {
              position: "bottom",
            },
            xaxis: {
              title: {
                text: "No. of Students",
                offsetX: 0,
                offsetY: 0,
                style: {
                  color: "rgb(23, 42, 69)",
                  fontSize: "15px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  cssClass: "apexcharts-xaxis-title",
                },
              },
            },
            yaxis: {
              title: {
                text: "Grade",
                style: {
                  color: "rgb(23, 42, 69)",
                  fontSize: "16px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  cssClass: "apexcharts-xaxis-title",
                },
              },
            },
          },
        },
      ],
    },
    series: [
      {
        name: "series-1",
        data: data2,
      },
    ],
  };

  return (
    <div>
      <div className="average-score">
        <div>
          <h2>Average score {averageScoreRounded}</h2>
        </div>
      </div>
      <div className="chart">
        <Chart
          options={data.options}
          series={data.series}
          type="bar"
          width="500"
        />
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default GraphComponent;
