import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import HashLoader from "react-spinners/HashLoader";

import ScorePromptForm from "./ScorePromptComponent";
import { api } from "../services/api";
import Header from "./Header";
import GraphComponent from "./GraphComponent";
import FeedbackComponent from "./FeedbackComponent";
import Footer from "./Footer";

const ScoreComponent = withRouter((props) => {
  const [subjectCode] = useState(props.match.params.code);
  const [scores, setScores] = useState([]);
  const [links, setLinks] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const [loader, setLoader] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const results = await api.get("/item/" + props.match.params.code);
      setScores(results?.data?.data[0]?.scores);
      setLinks(results?.data?.data[0]?.links);
      setFeedback(results?.data?.data[0]?.feedback);
      setLoader(false);
    };
    fetchData();
  }, []);

  function toggletoBlur() {
    if (buttonPopup !== true) {
      var blur = document.getElementById("blur");
      blur.classList.toggle("active");
    }
    setButtonPopup(true);
  }

  function toggletoRemoveBlur() {
    if (buttonPopup !== false) {
      var blur = document.getElementById("blur");
      blur.classList.toggle("active");
    }
    setButtonPopup(false);
  }

  const onWamButton = () => {
    console.log(subjectCode);
    const sendRequest = async () => {
      await api
        .post("/addwambooster", {
          subjectCode: subjectCode,
        })
        .then((res) => {
          localStorage.setItem("wambooster", true);
          window.location.reload();
        });
    };
    sendRequest();
  };

  return (
    <div>
      <Header />
      <div>
        <Link style={{ display: "flex" }} className="back-button" to="/">
          <FaBackward />
        </Link>
      </div>
      <div className="graph-heading">
        <span className="graph-name">{props.match.params.name}</span>
        <span className="graph-code">{props.match.params.code}</span>
        {localStorage.getItem("wambooster") ? (
          <></>
        ) : (
          <>
            <span className="mark-wam-btn">
              <button onClick={() => onWamButton()}>
                <div className="wam-booster-mark">
                  Mark as a WAM Booster <FaCheck />
                </div>
                <div className="warning">
                  1 user can only do one recommendation so think wisely :)
                </div>
              </button>
            </span>
          </>
        )}
        <div className="score-btns">
          <div className="score-popup-btn">
            <button classname="add-score-btn-2" onClick={() => toggletoBlur()}>
              Add Score
            </button>
            <ScorePromptForm
              data={props.match.params.code}
              trigger={buttonPopup}
              setTrigger={toggletoRemoveBlur}
            />
          </div>
          <div className="view-handbook-btn">
            <a
              href={`https://handbook.unimelb.edu.au/subjects/${props.match.params.code}`}
              target="_blank"
              rel="noreferrer"
            >
              <button>View Handbook</button>
            </a>
          </div>
        </div>
      </div>
      <div id="blur">
        {loader ? (
          <div className="loader-graph">
            <HashLoader size={170} color={"aqua"} loading={loader}></HashLoader>
          </div>
        ) : (
          <div>
            {scores.length > 0 ? (
              <div>
                <div className="graph">
                  <GraphComponent
                    scores={scores}
                    links={links}
                    code={props.match.params.code}
                  />
                </div>
                <div>
                  <FeedbackComponent
                    data={props.match.params.code}
                    feedback={feedback}
                  />
                </div>
              </div>
            ) : (
              <div className="no-results">
                <h1>No results!</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default ScoreComponent;
