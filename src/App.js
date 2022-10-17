import './App.css';
import React from 'react';
import Intro from './components/Intro'
import Quiz from './components/Quiz'
import Result from './components/Result'

import ReactGA from "react-ga4";

ReactGA.initialize("G-X8KYYN54XQ");
ReactGA.send("pageview");

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      screen: "intro",
      result: -100,
      vocabSize: 0,
      knownWords: 0,
      unknownWords: 0
    };
    this.setResult = this.setResult.bind(this)
    this.startQuiz = this.startQuiz.bind(this)
  }

  setResult(result, vocabSize, knownWords, unknownWords) {
    this.setState ({ 
      screen: "result",
      result: result,
      vocabSize: vocabSize,
      knownWords: knownWords,
      unknownWords: unknownWords
      })
  }
  
  startQuiz(){
    this.setState ({ 
      screen: "quiz",
      result: -100
      })   
  }

  render(){
    
    let screen
    if (this.state.screen === "intro") {
      screen = <Intro clickStart={this.startQuiz} />
    }
    if (this.state.screen === "quiz") {
      screen = <Quiz setResult={this.setResult}/>
    }
    if (this.state.screen === "result") {
      screen = <Result 
        result={this.state.result} 
        vocabSize={this.state.vocabSize} 
        goAgain={this.startQuiz} 
        knownWords={this.state.knownWords} 
        unknownWords={this.state.unknownWords} 
        />
    }

  return (
    <div className="App">
      <a href="/">
        <h1 className="heading">Vocabulary<span className="headingtest">test</span></h1>
      </a>
      <div>{screen}</div>
     </div>
  ) 
}

}



export default App;
