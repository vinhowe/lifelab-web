/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import PageWidth from "../../components/PageWidth";
import Button from "../../components/Button";

const actionButtonsStyle = css`
  display: flex;
  width: min-content;

  > * {
    margin-right: 10px;
  }
`;

export default function LabPage(): JSX.Element {
  return (
    <PageWidth>
      <h2>Welcome to your LifeLab!</h2>
      {/*<p>*/}
      {/*  The big idea here is experimenting to find out what works for you. Use{" "}*/}
      {/*  <b>Issues</b> to keep track of pain points in your self improvement*/}
      {/*  journey, and <b>Experiments</b> to test solutions over time.*/}
      {/*</p>*/}
      <p>
        <b>Start by adding a few issues.</b> An issue addresses any problem with
        or suggestion for living a fuller and more productive life. Examples
        might include:
      </p>
      <i>
        <ul>
          <li>I feel tired all the the time.</li>
          <li>Why haven&rsquo;t I started learning Spanish?</li>
          <li>
            I don&rsquo;t feel like I&rsquo;m making progress toward my goals.
          </li>
          <li>I want to start running.</li>
        </ul>
      </i>
      <p>
        <b>
          Once you&rsquo;ve got a few of these, start your first iteration
          planning session.
        </b>{" "}
      </p>
      <p>
        Every day, you&rsquo;ll <b>check-in</b> to reflect on the previous day
        and make small adjustments to your experiments.
      </p>
      <div css={actionButtonsStyle}>
        <Button onClick={() => null}>Start a check-in</Button>
        <Button onClick={() => null}>Start an iteration review</Button>
      </div>
    </PageWidth>
  );
}
