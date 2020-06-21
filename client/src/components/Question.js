import React, { Component } from 'react';
import '../assets/css/main.css';
import { Row, Col, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import QuestionImg from '../images/question.svg';
import axios from 'axios';

class Question extends Component {
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
        'Kanye',
        'Kanye West',
        'Kanye West',
        'Lady Gaga',
        'Leonard Cohen',
        'Lil Wayne',
        'Lil Wayne',
        'Lin Manuel Miranda',
        'Lorde',
        'Ludacris',
        'Michael Jackson',
        'Missy Elliott',
        'Nickelback',
        'Nicki Minaj',
        'Nirvana',
        'Notorious Big',
        'Notorious Big',
        'Nursery Rhymes',
        'Patti Smith',
        'Paul Simon',
        'Prince',
        'R Kelly',
        'Radiohead',
        'Rihanna',
      ],
      artist: '',
      question: '',
      answer: null,
      loading: false,
    };
    this.focus = React.createRef();
  }

  getAnswer = (cb) => {
    this.setState({ loading: true });
    axios
      .get('http://127.0.0.1:5000/question', {
        params: { question: this.state.question, artist: this.state.artist },
      })
      .then((res) => {
        this.setState({ answer: res.data.answer, loading: false });
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
                <img src={QuestionImg} alt="" />
              </span>
            </Col>
            <Col xs={5}>
              <h1>Question Answerer</h1>
              <p>
                <strong>Ask questions</strong> about your favorite artists, and
                get answers using AI.
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
                    <label htmlFor="words">Question</label>
                    <InputGroup
                      onChange={(e) => {
                        this.setState({ question: e.target.value });
                      }}
                    >
                      <FormControl value={this.state.question} id="words" />
                    </InputGroup>
                  </Col>
                  <Col xs={3}>
                    <Link
                      onClick={() => {
                        this.getAnswer(this.handleOnClick);
                      }}
                      className={
                        'button primary' +
                        ` ${
                          this.state.artist === '' ||
                          this.state.question === '' ||
                          this.state.question.length > 100
                            ? 'disabled'
                            : ''
                        }`
                      }
                    >
                      Get Answer
                    </Link>
                  </Col>
                  <Col xs={3}>{this.state.loading && <h3>Loading...</h3>}</Col>
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

export default Question;
