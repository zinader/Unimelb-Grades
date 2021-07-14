import React from "react";

import Header from "./Header";
import SubjectComponent from "./SubjectComponent";

import Footer from "./Footer";

function MainComponent() {
  return (
    <div>
      <Header />
      <div className="subheading">
        <h3>
          Here you can find an idea of the subject scores people have attained
          in the past semesters. Hope this helps :)
        </h3>
        <h3>
          {" "}
          If you want to give some feedback, have some suggestions or just can't
          find a subject, please fill this{" "}
          <a
            href="https://forms.gle/pDtsTf9J4crLmiEq5"
            className="missing-form"
            target="_blank"
            rel="noreferrer"
          >
            form
          </a>{" "}
          up.
        </h3>
      </div>

      <SubjectComponent />
      <Footer />
    </div>
  );
}

export default MainComponent;
