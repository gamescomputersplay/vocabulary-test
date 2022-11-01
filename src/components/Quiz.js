import React from 'react';
import Question from './Question'
import {apiURL, localData, useLocalData, levels} from '../Consts'

const wordCount = [ 500, 1000, 2500, 5000, 11000, 20000 ]
const highest_level = levels.length-1
const min_words = [4, 5, 6, 8, 10, 12]

class Quiz extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
          error: null,
          wordsAreLoaded: false,
          wordsData: null,
          currentLevel: 0,
          currentQuestion: 0,
          questionCounter: 0,
          known: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
          unknown: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
          knownWords: [ [], [], [], [], [], [], [], [], [], [] ],
          unknownWords: [ [], [], [], [], [], [], [], [], [], [] ],
          result: -100, // No result
          vocabSize: 0
      };
      
      this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
      
      if (useLocalData) {
        this.setState( 
          { 
            wordsAreLoaded: true, 
            wordsData: localData[this.props.language]
          })
      } else {
        fetch(apiURL[this.props.language])
        .then( (response) => response.json() )
        .then( (data) => this.setState( { wordsAreLoaded: true, wordsData: data }) );
      }

    }


    renderQuestion (level, wordnum){
      var word = this.state.wordsData[level][wordnum]
      return <Question 
        word={word[0]} 
        pos={word[1]} 
        level={word[2]} 
        definition={word[3]} 
        number={this.state.questionCounter}
        onClick = { this.handleClick }
        />
    }
   

    handleClick(known, word, definition){
  
      var newLevel = 0
      var newQuestion = 0
      var newQuestionCounter = this.state.questionCounter + 1
      var newKnown = this.state.known
      var newUnknown = this.state.unknown
      var newKnownWords = this.state.knownWords
      var newUnKnownWords = this.state.unknownWords
      var newResult = this.state.result
      var newVocabSize = 0
  
      var word_with_definition = {word: word, definition: definition}

      if (known) {
        newKnown[this.state.currentLevel] += 1
        newKnownWords[this.state.currentLevel].push(word_with_definition)
      }
      else {
        newUnknown[this.state.currentLevel] += 1
        newUnKnownWords[this.state.currentLevel].push(word_with_definition)

      }
  
      var correct = newKnown[this.state.currentLevel]
      var incorrect = newUnknown[this.state.currentLevel]
      var total = correct + incorrect
  
      // Move to the next level
      if ( total >= min_words[this.state.currentLevel] && correct/total > 0.8 ) {
        if ( this.state.currentLevel === highest_level ) { // Reached the highest level
          newResult = this.state.currentLevel
        }
        else{
          newLevel = this.state.currentLevel + 1
          newQuestion = 0
        }
      }
  
      // End test and Final result is previous level
      else if ( total >= 10 && correct/total < .3 ){
        newResult = this.state.currentLevel - 1
      }
      
      // Asked all questions: Bands of the 12th question
      else if ( total === 12 ){
        if ( correct/total < .45 ) {
          newResult = this.state.currentLevel - 1
        }
        else if ( correct/total < .65 ) {
          newResult = this.state.currentLevel - 1
        }
        else {
          newResult = this.state.currentLevel
        }
      }
  
      // Keep on testing  
      else {
        newLevel = this.state.currentLevel
        newQuestion = this.state.currentQuestion + 1
      }
      
      
      for (var i = 0; i < levels.length; i++) {
        var thisLevelKnown = this.state.known[i]
        var thisLevelUnKnown = this.state.unknown[i]
        var thisLevelRatio = thisLevelKnown + thisLevelUnKnown === 0 ? 0 : thisLevelKnown / (thisLevelKnown + thisLevelUnKnown)
        newVocabSize += thisLevelRatio * wordCount[i]
        newVocabSize = Math.ceil(newVocabSize / 100) * 100;
      }

  
      this.setState({
        currentLevel: newLevel,
        currentQuestion: newQuestion,
        questionCounter: newQuestionCounter,
        known: newKnown,
        unknown: newUnknown,
        knownWords: newKnownWords,
        unknownWords: newUnKnownWords,
        result: newResult,
        vocabSize: newVocabSize
      })
      console.log(this.state.knownWords)
      // console.log(this.state.unknownWords)

        // Update State upstream
        if (newResult !== -100) {
          // console.log(newVocabSize)
          this.props.setResult(newResult, newVocabSize, newKnownWords, newUnKnownWords)
        }
        
    }
  
    render() {
      if (this.state.error) {
        return <div>Error: {this.state.error.message}</div>;
        }
      else if (!this.state.wordsAreLoaded) {
            return <div className="loading">Loading words, please wait...</div>
        }
      else if (this.state.result === -100) {
        return (
          <div>
              {this.renderQuestion (this.state.currentLevel,this.state.currentQuestion)}
          </div>
        );
        }
      else {
        return null
      }
    }
  
}

  export default Quiz;