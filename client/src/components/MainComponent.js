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
          Mostly all the subjects are in the list but if you can find a subject
          which is not, please fill this{" "}
          <a
            href="https://forms.gle/Co1wpzbGnNoX7dC48"
            className="missing-form"
            target="_blank"
            rel="noreferrer"
          >
            form
          </a>{" "}
          up and I'll add it asap.
        </h3>
      </div>

      <SubjectComponent />
      <Footer />
    </div>
  );
}

export default MainComponent;
