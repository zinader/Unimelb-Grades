import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import HashLoader from "react-spinners/HashLoader";

import ScorePromptForm from "./ScorePromptComponent";
import { api } from "../services/api";

const FeedbackComponent = withRouter((props) => {
  useEffect(() => {
    const fetchData = async () => {
      const results = await api.get("/feedback");
      setScores(results?.data?.data[0]?.scores);
      setLoader(false);
    };
    fetchData();
  }, []);

  return <div>hello</div>;
});

export default FeedbackComponent;
