import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaWindowClose } from "react-icons/fa";
import { api } from "../services/api";

const ScorePromptForm = (props) => {
  const [subjectCode] = useState(props.data);
  const [score, setScore] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendRequest = async () => {
      await api
        .post("/", {
          subjectCode,
          score,
        })
        .then((res) => {
          alert("Thankyou for contributing :)");
          window.location.reload();
        });
    };

    if (
      score.replace(/\s/g, "") !== "" &&
      isFinite(score) &&
      parseInt(score) <= 100
    ) {
      sendRequest();
    } else {
      alert("Please enter a valid number!");
    }
    setScore("");
  };

  return props.trigger ? (
    <div className="popup">
      <div>
        <button className="close-button-2" onClick={() => props.setTrigger()}>
          {" "}
          <span className="close-icon">
            <FaWindowClose />
          </span>
        </button>
      </div>
      <div className="form">
        <div className="form-div-heading">Add your score for {props.data}</div>
        <div className="form-div-sub-heading">
          We would love it if you could contribute to this dataset. :) This is a
          crowdsourced database so please don't spam it.
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <div>
              <Form.Label className="form-name">Score</Form.Label>

              <Form.Control
                className="score-input"
                required
                placeholder="79"
                onChange={(e) => setScore(e.target.value)}
              />
            </div>
            <div className="popup-trigger-2">
              <Button
                className="mb-5 text-center submit-button"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form.Row>
        </Form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ScorePromptForm;
