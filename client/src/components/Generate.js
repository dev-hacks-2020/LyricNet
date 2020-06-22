import React, { Component } from 'react';
import '../assets/css/main.css';
import { Row, Col, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TextGen from '../images/text_gen.svg';
import axios from 'axios';
const filter = require('leo-profanity');

class Generate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [
        'Adele',
        'Al Green',
        'Alicia Keys',
        'Amy Winehouse',
        'Beatles',
        'Bieber',
        'Bjork',
        'Blink 182',
        'Bob Dylan',
        'Bob Marley',
        'Britney Spears',
        'Bruce Springsteen',
        'Bruno Mars',
        'Cake',
        'Dickinson',
        'Disney',
        'Dj Khaled',
        'Dolly Parton',
        'Dr Seuss',
        'Drake',
        'Eminem',
        'Janisjoplin',
        'Jimi Hendrix',
        'Johnny Cash',
        'Joni Mitchell',
        'Kanye West',
        'Kanye',
        'Lady Gaga',
        'Lil Wayne',
      ],
      artist: '',
      words: 50,
      lyrics: null,
      generating: false,
      lines: 10,
      syllables: 25,
    };
    this.focus = React.createRef();
  }

  handleOnClick = () => {
    if (this.focus.current)
      this.focus.current.scrollIntoView({
        behaviour: 'smooth',
        block: 'nearest',
      });
  };

  componentDidMount() {}

  getLyrics = (cb) => {
    axios
      .get('http://35.223.180.255:5000/generate', {
        params: {
          artist: this.state.artist,
          lines: this.state.lines,
          syllables: this.state.syllables,
        },
      })
      .then((res) => {
        this.setState({ lyrics: res.data.lyrics.join('\n') });
        cb();
      });
  };

  render() {
    return (
      <div id="wrapper">
        <header id="header" className="alt">
          <Row>
            <Col xs={7}>
              <span className="logo">
                <img src={TextGen} alt="" />
              </span>
            </Col>
            <Col xs={5}>
              <h1>Lyrics Generator</h1>
              <p>
                <strong>Generate lyrics</strong> that sound like your favorite
                artists using AI.
                <br />
              </p>
            </Col>
          </Row>
        </header>

        <nav id="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/question">Ask A Question</Link>
            </li>
            <li>
              <Link to="/complete">Complete Lyrics</Link>
            </li>
          </ul>
        </nav>

        <div id="main">
          <section className="main">
            <div className="spotlight">
              <div className="content">
                <header className="major">
                  <h2>Pick An Artist: {this.state.artist}</h2>
                </header>
                <Row className="justify-content-center">
                  {this.state.artists.map((artist) => (
                    <Col xs={3}>
                      <a
                        className="button"
                        onClick={() => {
                          this.setState({ artist: artist });
                        }}
                        style={{ margin: '0.5em' }}
                      >
                        {artist}
                      </a>
                    </Col>
                  ))}
                </Row>
                <Row className="justify-content-center">
                  <Col xs={4}>
                    <label htmlFor="lines">Lines</label>
                    <InputGroup
                      onChange={(e) => {
                        this.setState({ lines: e.target.value });
                      }}
                    >
                      <FormControl
                        value={this.state.lines}
                        type="number"
                        id="lines"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={4}>
                    <label htmlFor="syllables">Syllables Per Line</label>
                    <InputGroup
                      onChange={(e) => {
                        this.setState({ syllables: e.target.value });
                      }}
                    >
                      <FormControl
                        value={this.state.syllables}
                        type="number"
                        id="syllables"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={4}>
                    <Link
                      onClick={() => {
                        this.getLyrics(this.handleOnClick);
                      }}
                      className={
                        'button primary' +
                        ` ${
                          this.state.artist === '' || this.state.words > 750
                            ? 'disabled'
                            : ''
                        }`
                      }
                    >
                      Generate Lyrics
                    </Link>
                  </Col>
                  <Col className="primary">
                    {this.state.generating && <h3>Generating...</h3>}
                  </Col>
                </Row>
              </div>
            </div>
          </section>
        </div>
        {this.state.lyrics && (
          <div
            id="main"
            style={{
              marginTop: '3em',
              marginBottom: '3em',
            }}
          >
            <section className="main" id="lyrics">
              <div className="spotlight">
                <div className="content">
                  <header className="major">
                    <h2>Generated Lyrics</h2>
                  </header>
                </div>
              </div>
              <p ref={this.focus}>{filter.clean(this.state.lyrics)}</p>
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default Generate;
