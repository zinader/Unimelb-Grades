import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import customData from "./data/data.json";
import HashLoader from "react-spinners/HashLoader";
import { api } from "../services/api";
import PromptForm from "./PromptComponent";

const SubjectComponent = withRouter(() => {
  const [subjects, setSubjects] = useState(customData);
  const [topsubjects, setTopSubjects] = useState([]);
  const [tempSubjects, setTempSubjects] = useState([]);
  const [loader, setLoader] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const results = await api.get("/");
      setSubjects(results?.data?.data);
    };
    fetchData();
  }, []);

  // Local Storage Implementation (to be updated after all data is there)

  // useEffect(() => {
  //   if (localStorage.length == 0) {
  //     const fetchData = async () => {
  //       const results = await api.get("/");
  //       localStorage.setItem("subject", JSON.stringify(results?.data?.data));
  //       setSubjects(results?.data?.data);
  //     };
  //     fetchData();
  //   } else {
  //     setSubjects(JSON.parse(localStorage.getItem("subject")));
  //   }
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const results = await api.get("/top");
      setTopSubjects(results?.data?.data);
      setLoader(false);
    };
    fetchData();
  }, []);

  const filter = (e) => {
    const keyword = e.target.value;

    const keywordWithNoResults = [
      {
        subjectName: "No results for " + keyword,
        subjectCode: "",
        scores: [],
      },
    ];

    if (!keyword) {
      return setTempSubjects(topsubjects);
    } else {
      const results = subjects?.filter((subject) => {
        return (
          subject?.subjectName
            ?.toLowerCase()
            ?.indexOf(keyword.toLowerCase()) !== -1 ||
          subject?.subjectCode
            ?.toLowerCase()
            ?.indexOf(keyword.toLowerCase()) !== -1
        );
      });
      setTempSubjects(results.slice(0, 20));
      if (!results.length) {
        setTempSubjects(keywordWithNoResults);
      }
    }
  };

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

  return (
    <div>
      <div className="container-fluid main-component">
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search"
              onChange={filter}
            />
            <span className="search-icon">
              <FaSearch />
            </span>
            <span className="popup-btn">
              <button classname="add-score-btn" onClick={() => toggletoBlur()}>
                Add Score
              </button>
              <PromptForm
                trigger={buttonPopup}
                setTrigger={toggletoRemoveBlur}
              />
            </span>
          </label>
          <div>
            <h2>Top Subjects</h2>
          </div>
        </div>
        <div id="blur">
          {loader ? (
            <div className="loader">
              <HashLoader
                size={170}
                color={"aqua"}
                loading={loader}
              ></HashLoader>
            </div>
          ) : (
            <div className="subjects">
              <div className="row">
                {tempSubjects.length > 0 ? (
                  <>
                    {tempSubjects?.map((data) => (
                      <div className="col-md-4">
                        <Link
                          to={`/subjects/${data.subjectName}/${data.subjectCode}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="subjects-div">
                            <div className="subject-name">
                              <h1>{data.subjectName}</h1>
                              <div className="subject-scores-length">
                                <h3>{data?.scores?.length} Results</h3>
                              </div>
                            </div>
                            <div className="subject-code">
                              <h2>{data.subjectCode}</h2>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {topsubjects?.map((data) => (
                      <div className="col-md-4">
                        <Link
                          to={`/subjects/${data.subjectName}/${data.subjectCode}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="subjects-div">
                            <div className="subject-name">
                              <h1>{data.subjectName}</h1>
                              <div className="subject-scores-length">
                                <h3>{data?.scores?.length} Results</h3>
                              </div>
                            </div>

                            <div className="subject-code">
                              <h2>{data.subjectCode}</h2>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default SubjectComponent;
