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
      lyrics: '',
      loading: false,
    };
    this.focus = React.createRef();
  }

  getAnswer = (cb) => {
    this.setState({ loading: true });
    axios
      .get('http://127.0.0.1:5000/complete', {
        params: { input: this.state.lyrics, artist: this.state.artist },
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

  componentDidMount() {}

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
                  <Col xs={9}>
                    <label htmlFor="words">Lyrics</label>
                    <InputGroup
                      onChange={(e) => {
                        this.setState({ lyrics: e.target.value });
                      }}
                      onKeyPress={(e) => {
                        if (
                          e.key === 'Enter' &&
                          !(
                            this.state.artist === '' ||
                            this.state.lyrics === '' ||
                            this.state.lyrics.length > 300
                          )
                        ) {
                          e.preventDefault();
                          this.getAnswer(this.handleOnClick);
                        }
                      }}
                    >
                      <FormControl
                        as="textarea"
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
                            this.state.artist === '' ||
                            this.state.lyrics === '' ||
                            this.state.lyrics.length > 300
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
        {this.state.answer ? (
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
                    <h2>Answer</h2>
                  </header>
                </div>
              </div>
              <p class="text-center" ref={this.focus}>
                {this.state.answer}
              </p>
            </section>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Complete;
