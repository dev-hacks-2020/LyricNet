import React, { Component } from 'react';
import '../assets/css/main.css';
import { Row, Col, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CompleteImg from '../images/fill_in.svg';
import axios from 'axios';

class Complete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      artist: '',
      lyrics: '',
      customArtist: '',
      songs: 1,
      loading: false,
      training: false,
    };
    this.focus = React.createRef();
  }

  train = () => {
    this.setState({ training: true });
    axios
      .post('http://127.0.0.1:5000/complete', {
        artist: this.state.customArtist,
        songs: this.state.songs,
      })
      .then((res) => {
        this.setState({ training: false });
        this.getArtists();
      });
  };

  getAnswer = (cb) => {
    this.setState({ loading: true });
    axios
      .get('http://127.0.0.1:5000/complete', {
        params: {
          input: this.state.lyrics.split(' ')[
            this.state.lyrics.split(' ').length - 1
          ],
          artist: this.state.artist,
        },
      })
      .then((res) => {
        this.setState((state, props) => ({
          lyrics: state.lyrics + ' ' + res.data.word,
          loading: false,
        }));
        cb();
      });
  };

  handleOnClick = () => {
    if (this.focus.current)
      this.focus.current.scrollIntoView({
        behaviour: 'smooth',
        block: 'nearest',
      });
  };

  getArtists = () => {
    axios.get('http://127.0.0.1:5000/complete-artists').then((res) => {
      this.setState({ artists: res.data });
    });
  };

  componentDidMount() {
    this.getArtists();
  }

  render() {
    return (
      <div id="wrapper">
        <header id="header" className="alt">
          <Row>
            <Col xs={7}>
              <span className="logo">
                <img src={CompleteImg} alt="" />
              </span>
            </Col>
            <Col xs={5}>
              <h1>Lyrics Completer</h1>
              <p>
                <strong>Complete lyrics</strong> using the style of your
                favorite artists using AI.
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
              <Link to="/generate">Generate Lyrics</Link>
            </li>
            <li>
              <Link to="/question">Ask A Question</Link>
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
                    <Col>
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
                  <Col xs={9}>
                    <label htmlFor="words">
                      Lyrics (Press Enter to complete)
                    </label>
                    <InputGroup
                      onChange={(e) => {
                        this.setState({ lyrics: e.target.value });
                      }}
                      onKeyPress={(e) => {
                        if (
                          e.key === 'Enter' &&
                          !(
                            this.state.artist === '' || this.state.lyrics === ''
                          )
                        ) {
                          e.preventDefault();
                          this.getAnswer(this.handleOnClick);
                        }
                      }}
                    >
                      <FormControl
                        as="textarea"
                        rows="10"
                        value={this.state.lyrics}
                        id="words"
                      />
                    </InputGroup>
                  </Col>

                  {this.state.loading ? (
                    <Col xs={3}>
                      <h3>Loading...</h3>
                    </Col>
                  ) : (
                    <Col xs={3}>
                      <Link
                        onClick={() => {
                          this.getAnswer(this.handleOnClick);
                        }}
                        className={
                          'button primary' +
                          ` ${
                            this.state.artist === '' || this.state.lyrics === ''
                              ? 'disabled'
                              : ''
                          }`
                        }
                      >
                        Complete
                      </Link>
                    </Col>
                  )}
                </Row>
              </div>
            </div>
          </section>
        </div>

        <div id="main" style={{ marginTop: '3em', marginBottom: '3em' }}>
          <section className="main">
            <div className="spotlight">
              <div className="content">
                <header className="major">
                  <h2>Train On A Custom Artist</h2>
                </header>
                <Row>
                  <Col>
                    <label htmlFor="words">Custom Artist Name</label>
                    <InputGroup
                      onChange={(e) => {
                        this.setState({ customArtist: e.target.value });
                      }}
                    >
                      <FormControl value={this.state.customArtist} id="words" />
                    </InputGroup>
                  </Col>
                  <Col>
                    <label htmlFor="songs">Number Of Songs To Train On</label>
                    <InputGroup
                      onChange={(e) => {
                        this.setState({ songs: e.target.value });
                      }}
                    >
                      <FormControl
                        value={this.state.songs}
                        type="number"
                        id="songs"
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <Link
                      onClick={this.train}
                      className={
                        'button primary' +
                        ` ${
                          this.state.customArtist === '' ||
                          !this.state.songs ||
                          this.state.songs < 0
                            ? 'disabled'
                            : ''
                        }`
                      }
                    >
                      Train
                    </Link>
                    {this.state.training && <h3>Training...</h3>}
                  </Col>
                </Row>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Complete;
