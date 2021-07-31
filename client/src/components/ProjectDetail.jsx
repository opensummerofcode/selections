import React from 'react';

const ProjectDetail = () => {
  return (
    <>
      <header>
        <h2>
          <span>Project-name</span>
          <a>Client-name</a>
          <div>IMAGE of brand</div>
        </h2>
        <div>
          <p>Project info...</p>
        </div>
        <div>
          <h3>client details</h3>
          <ul>
            <li>
              Peter Parkinson
              <a>SOCIALS</a>
              <a>SOCIALS</a>
              <a>SOCIALS</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Coaches</h3>
          <span>NAME</span> -- <span>PROFILE</span> -- <span>COACH/HELP-COACH</span>
          <span>NAME</span> -- <span>PROFILE</span> -- <span>COACH/HELP-COACH</span>
        </div>
        <ul>
          <li>
            1x FULL-STACK-DEVELOPER
            <ul>
              <li>
                <p>Student-name</p>
                <p>Best-skill</p>
                <p>Second-Best-skill</p>
                <p>Suggestions</p>
              </li>
            </ul>
          </li>
        </ul>
      </header>
    </>
  );
};

export default ProjectDetail;
