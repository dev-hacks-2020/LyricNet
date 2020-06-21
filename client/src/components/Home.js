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
    // <!-- Wrapper -->
    <div id="wrapper">
      {/* <!-- Header --> */}
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

      {/* <!-- Nav --> */}
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

      {/* <!-- Main --> */}
      <div id="main">
        {/* <!-- Introduction --> */}
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

        {/* <!-- First Section --> */}
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

        {/* <!-- First Section --> */}
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

        <section id="gcp" className="main">
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

        {/* <!-- Get Started --> */}
        <section id="cta" className="main special">
          <header className="major">
            <h2>Congue imperdiet</h2>
            <p>
              Donec imperdiet consequat consequat. Suspendisse feugiat congue
              <br />
              posuere. Nulla massa urna, fermentum eget quam aliquet.
            </p>
          </header>
          <footer className="major">
            <ul className="actions special">
              <li>
                <a href="generic.html" className="button primary">
                  Get Started
                </a>
              </li>
              <li>
                <a href="generic.html" className="button">
                  Learn More
                </a>
              </li>
            </ul>
          </footer>
        </section>
      </div>

      {/* <!-- Footer --> */}
      <footer id="footer">
        <section>
          <h2>Aliquam sed mauris</h2>
          <p>
            Sed lorem ipsum dolor sit amet et nullam consequat feugiat consequat
            magna adipiscing tempus etiam dolore veroeros. eget dapibus mauris.
            Cras aliquet, nisl ut viverra sollicitudin, ligula erat egestas
            velit, vitae tincidunt odio.
          </p>
          <ul className="actions">
            <li>
              <a href="generic.html" className="button">
                Learn More
              </a>
            </li>
          </ul>
        </section>
        <section>
          <h2>Etiam feugiat</h2>
          <dl className="alt">
            <dt>Address</dt>
            <dd>1234 Somewhere Road &bull; Nashville, TN 00000 &bull; USA</dd>
            <dt>Phone</dt>
            <dd>(000) 000-0000 x 0000</dd>
            <dt>Email</dt>
            <dd>
              <a href="#">information@untitled.tld</a>
            </dd>
          </dl>
          <ul className="icons">
            <li>
              <a href="#" className="icon brands fa-twitter alt">
                <span className="label">Twitter</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon brands fa-facebook-f alt">
                <span className="label">Facebook</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon brands fa-instagram alt">
                <span className="label">Instagram</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon brands fa-github alt">
                <span className="label">GitHub</span>
              </a>
            </li>
            <li>
              <a href="#" className="icon brands fa-dribbble alt">
                <span className="label">Dribbble</span>
              </a>
            </li>
          </ul>
        </section>
        <p className="copyright">
          &copy; Untitled. Design: <a href="https://html5up.net">HTML5 UP</a>.
        </p>
      </footer>
    </div>
  );
}

export default Home;
