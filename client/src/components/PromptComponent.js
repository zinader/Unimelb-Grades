import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaWindowClose } from "react-icons/fa";
import { api } from "../services/api";

const PromptForm = (props) => {
  const [subjectCode, setSubjectCode] = useState("");
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
          if (res?.data?.data == null) {
            alert("Please check subject code again.");
          } else {
            alert("Thankyou for contributing :)");
            window.location.reload();
          }
        });
    };

    if (score.replace(/\s/g, "") !== "" && isFinite(score)) {
      sendRequest();
    } else {
      alert("Please enter a valid number!");
    }
  };

  return props.trigger ? (
    <div className="popup">
      <div>
        <button className="close-button" onClick={() => props.setTrigger()}>
          {" "}
          <span className="close-icon">
            <FaWindowClose />
          </span>
        </button>
      </div>
      <div className="form">
        <div className="form-div-heading">Add your scores</div>
        <div className="form-div-sub-heading">
          We would love it if you could contribute to this dataset. :) This is a
          crowdsourced database so please don't spam it.
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <div>
              <Form.Label className="form-name">Subject Code</Form.Label>
              <Form.Control
                className="subjectname-input"
                required
                placeholder="MAST10010"
                onChange={(e) => setSubjectCode(e.target.value.toUpperCase())}
              />
            </div>
            <div>
              <Form.Label className="form-name">Score</Form.Label>

              <Form.Control
                className="score-input"
                required
                placeholder="79"
                onChange={(e) => setScore(e.target.value)}
              />
            </div>
            <div className="popup-trigger">
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

export default PromptForm;
