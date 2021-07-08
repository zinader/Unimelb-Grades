import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import { api } from "../../services/api";
import Header from "../Header";
import { FaBackward } from "react-icons/fa";
import HashLoader from "react-spinners/HashLoader";

const WamBoosterComponent = withRouter(() => {
  const [wamBoosters, setwamBoosters] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const results = await api.get("/wamboosters");

      setwamBoosters(results);
      setLoader(false);
    };
    fetchData();
  });

  return (
    <div>
      <Header />
      <div>
        <Link style={{ display: "flex" }} className="back-button" to="/">
          <FaBackward />
        </Link>
      </div>
      <div className="wam-booster-heading">WAM Boosters</div>
      {loader ? (
        <div className="loader">
          <HashLoader size={170} color={"aqua"} loading={loader}></HashLoader>
        </div>
      ) : (
        <div className="subjects">
          <div className="row">
            {wamBoosters?.data?.data.map((data) => (
              <div className="col-md-4">
                <Link
                  to={`/subjects/wamboosters/${data.subjectName}/${data.subjectCode}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="subjects-div">
                    <div className="subject-name">
                      <h1>{data.subjectName}</h1>
                      <div className="subject-scores-length">
                        <h3>Recommended by {data?.wamBooster}</h3>
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
  );
});

export default WamBoosterComponent;
