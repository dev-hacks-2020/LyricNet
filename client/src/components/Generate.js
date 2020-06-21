import React, { Component } from 'react';
import '../assets/css/main.css';
import { Row, Col, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TextGen from '../images/text_gen.svg';
import axios from 'axios';

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
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then((res) => {
      this.setState({ lyrics: res.data.body });
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
                  <Col xs={6}>
                    <label htmlFor="words">Number Of Words To Generate</label>
                    <InputGroup
                      onChange={(e) => {
                        this.setState({ words: e.target.value });
                      }}
                    >
                      <FormControl
                        value={this.state.words}
                        type="number"
                        id="words"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={6}>
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
                </Row>
              </div>
            </div>
          </section>
        </div>
        {this.state.lyrics ? (
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
              <p ref={this.focus}>{this.state.lyrics}</p>
            </section>
          </div>
        ) : (
          <Spinner animation="border" variant="primary" ref={this.focus} />
        )}
      </div>
    );
  }
}

export default Generate;
