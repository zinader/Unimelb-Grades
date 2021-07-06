import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import customData from "./data/data.json";
import HashLoader from "react-spinners/HashLoader";
import { api } from "../services/api";
import axios from "axios";

const SubjectComponent = withRouter(() => {
  const [subjects, setSubjects] = useState(customData);
  const [topsubjects, setTopSubjects] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const results = await api.get("/");
      setSubjects(results?.data?.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const results = await api.get("/top");
      setTopSubjects(results?.data?.data);
      setLoader(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="container-fluid main-component">
        {loader ? (
          <div className="loader">
            <HashLoader size={170} color={"aqua"} loading={loader}></HashLoader>
          </div>
        ) : (
          <div className="subjects">
            <div className="row">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default SubjectComponent;
