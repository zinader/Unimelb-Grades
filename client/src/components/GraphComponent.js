import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { withRouter } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
import { linkSync } from "fs";
import { api } from "../services/api";

const GraphComponent = withRouter((props) => {
  const [scores] = useState(props.scores);
  const [links, setLinks] = useState(props.links);
  const [link, setLink] = useState("");
  const [subjectCode] = useState(props.code);

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
          breakpoint: 1100,
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

  const fetchData = async () => {
    const results = await api.get("/item/" + subjectCode);
    setLinks(results?.data?.data[0]?.links);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendRequest = async () => {
      await api
        .post("/addlinks", {
          subjectCode,
          link,
        })
        .then((res) => {
          fetchData();
        });
    };

    if (links.includes(link)) {
      alert("Link already present!");
    } else {
      sendRequest();
    }
  };

  return (
    <div>
      <div className="average-score">
        <div>
          <h2>Average score {averageScoreRounded}</h2>
        </div>
      </div>
      <div className="graph-links">
        <div className="chart">
          <Chart
            options={data.options}
            series={data.series}
            type="bar"
            width="500"
          />
        </div>
        <div className="important-links">
          {" "}
          <div className="important-links-heading">
            <h3>Important Links</h3>
          </div>
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <div>
                  <Form.Label className="add-feedback-form-name">
                    Add link
                  </Form.Label>

                  <Form.Control
                    className="link-input"
                    required
                    type="url"
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
                <div className="link-submit-button">
                  <Button
                    className="mb-5 text-center"
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Form.Row>
            </Form>
          </div>
          {links.length > 0 ? (
            <div className="all-links">
              {links.map((data) => (
                <a href={data} target="_blank">
                  <div className="individual-link">
                    <h6>{data}</h6>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <br></br>
      <br></br>
    </div>
  );
});

export default GraphComponent;
