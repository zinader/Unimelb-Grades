import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { api } from "../services/api";

const FeedbackComponent = withRouter((props) => {
  const [subjectCode] = useState(props.data);
  const [allfeedback, setAllFeedback] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const nonReportedFeedback = [];

    const fetchData = async () => {
      const results = await api.get("/item/" + props.data);
      for (let i of results?.data?.data[0]?.feedback) {
        if (i.report !== true) {
          nonReportedFeedback.push(i);
        }
      }
      setAllFeedback(nonReportedFeedback);
    };
    fetchData();
  }, []);

  const handleUpvote = (upvotes, id) => {
    const sendRequest = async () => {
      await api
        .post("/feedback/upvote/" + upvotes, {
          subjectCode,
          id,
        })
        .then((res) => {
          window.location.reload();
        });
    };
    sendRequest();
  };

  const handleDownvote = (upvotes, id) => {
    const sendRequest = async () => {
      await api
        .post("/feedback/downvote/" + upvotes, {
          subjectCode,
          id,
        })
        .then((res) => {
          window.location.reload();
        });
    };
    sendRequest();
  };

  const handleReport = (id) => {
    const sendRequest = async () => {
      await api
        .post("/feedback/report", {
          subjectCode,
          id,
        })
        .then((res) => {
          alert("Comment Reported. We will review the comment soon :)");
          window.location.reload();
        });
    };
    sendRequest();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sendRequest = async () => {
      await api
        .post("/addfeedback", {
          subjectCode,
          feedback: [{ comment: comment }],
        })
        .then((res) => {
          window.location.reload();
        });
    };
    sendRequest();
    setComment("");
  };

  return (
    <div>
      <div className="feedback-heading">Comments</div>
      <div className="feedback">
        {allfeedback?.map((data) => (
          <div className="col-md-4">
            <div className="feedback-div">
              <div className="feedback-comment">
                <h1>{data.comment}</h1>
                <div className="feedback-buttons">
                  <div className="upvote-button">
                    <button
                      onClick={() => handleUpvote(data.upvotes, data._id)}
                    >
                      Upvote
                    </button>
                  </div>
                  <div className="downvote-button">
                    <button
                      onClick={() => handleDownvote(data.upvotes, data._id)}
                    >
                      Downvote
                    </button>
                  </div>
                  <div className="report-comment">
                    <button onClick={() => handleReport(data._id)}>
                      Report
                    </button>
                  </div>
                </div>
              </div>
              <div className="upvotes">
                <h2>{data.upvotes}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="add-feedback-div">
        {/* <div className="add-feedback-heading">Add feedback</div>
        <div className="add-feedback-input">
          <input></input>
        </div> */}
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <div>
              <Form.Label className="add-feedback-form-name">
                Add feedback
              </Form.Label>

              <Form.Control
                className="feedback-input"
                required
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="feedback-submit-button">
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
    </div>
  );
});

export default FeedbackComponent;
