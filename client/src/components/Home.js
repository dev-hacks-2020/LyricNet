import React from 'react';
import '../assets/css/main.css';
import Landing from '../images/landing.svg';
import TextGen from '../images/text_gen.svg';
import Question from '../images/question.svg';
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GCP from '../images/gcp.png';
import Complete from '../images/fill_in.svg';

function Home() {
  return (
    <div id="wrapper">
      <header id="header" className="alt">
        <Row>
          <Col xs={7}>
            <span className="logo">
              <img src={Landing} alt="" />
            </span>
          </Col>
          <Col xs={5}>
            <h1>LyricNet</h1>
            <p>
              <strong>Generate lyrics</strong> that sound like your favorite
              artists, <strong>ask them questions</strong>, and{' '}
              <strong>autocomplete your lyrics</strong> in their style using AI.
              <br />
            </p>
            <Col>
              <Link
                classNameName="button"
                to="/generate"
                style={{ margin: '1em', marginBottom: '0.5em' }}
              >
                Generate Lyrics
              </Link>
            </Col>
            <Col>
              <Link
                to="/question"
                classNameName="button"
                style={{ margin: '1em', marginTop: '0.5em' }}
              >
                Ask A Question
              </Link>
            </Col>
            <Col>
              <Link
                to="/complete"
                classNameName="button"
                style={{ margin: '1em', marginTop: '0.5em' }}
              >
                Autocomplete Lyrics
              </Link>
            </Col>
          </Col>
        </Row>
      </header>

      <nav id="nav">
        <ul>
          <li>
            <Link to="/generate">Lyrics Generation</Link>
          </li>
          <li>
            <Link to="/question">Question Answering</Link>
          </li>
          <li>
            <Link to="/complete">Lyrics Autocompletion</Link>
          </li>
        </ul>
      </nav>

      <div id="main">
        <section id="generate" className="main">
          <div className="spotlight">
            <div className="content">
              <header className="major">
                <h2>Lyrics Generation</h2>
              </header>
              <p>
                A <strong>markov decision chain</strong> coupled with a{' '}
                <strong>recurrent neural network (RNN)</strong> is used to
                <strong> replicate the style of a particular artist </strong>
                upon training on their discography.
              </p>
              <ul className="actions">
                <li>
                  <Link to="/generate" className="button">
                    Generate Lyrics
                  </Link>
                </li>
              </ul>
            </div>
            <span className="image">
              <img src={TextGen} alt="" />
            </span>
          </div>
        </section>

        <section id="question" className="main">
          <div className="spotlight">
            <div className="content">
              <header className="major">
                <h2>Question Answering</h2>
              </header>
              <p>
                Using the language representation model <strong>BERT</strong>,
                LyricNet can pick up on the{' '}
                <strong>context before and after words, </strong>
                allowing for a wide range of tasks, such as{' '}
                <strong>question answering. </strong>
                When trained on the discography of a particular artist, the BERT
                model can answer questions about the artists' lyrics.
              </p>
              <ul className="actions">
                <li>
                  <Link to="/question" className="button">
                    Ask A Question
                  </Link>
                </li>
              </ul>
            </div>
            <span className="image">
              <img src={Question} alt="" />
            </span>
          </div>
        </section>

        <section id="question" className="main">
          <div className="spotlight">
            <div className="content">
              <header className="major">
                <h2>Lyrics Auto-Completion</h2>
              </header>
              <p>
                Using a <strong>markov decision chain</strong>, LyricNet can
                predict the next likely word to come after a previous word.
              </p>
              <ul className="actions">
                <li>
                  <Link to="/complete" className="button">
                    Complete Lyrics
                  </Link>
                </li>
              </ul>
            </div>
            <span className="image">
              <img src={Complete} alt="" />
            </span>
          </div>
        </section>

        <section id="gcp" className="main" style={{ marginBottom: '3em' }}>
          <div className="spotlight">
            <div className="content">
              <header className="major">
                <h2>Powered By Google Cloud Platform</h2>
              </header>
              <p>
                A <strong>bucket</strong> is used to deploy the React app, and{' '}
                <strong>App Engine</strong> is used to host the flask back end,
                which contains the machine learning model.
              </p>
            </div>
            <span className="image">
              <img src={GCP} alt="" />
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
