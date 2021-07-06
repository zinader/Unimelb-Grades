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
      </div>

      <SubjectComponent />
      <Footer />
    </div>
  );
}

export default MainComponent;
