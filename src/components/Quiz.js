import React from 'react';
import Question from './Question'
import {levels, useLocalData } from '../Consts'

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

      const apiURL = "http://how-many-words-do-you-know.com/vocabapi/v1/"
      
      if (useLocalData) {
        this.setState( 
          { 
            wordsAreLoaded: true, 
            wordsData: [[["bad", "adjective", "A1"], ["chicken", "noun", "A1"], ["test", "noun", "A1"], ["post office", "noun", "A1"], ["group", "noun", "A1"], ["great", "adjective", "A1"], ["line", "noun", "A1"], ["ticket", "noun", "A1"], ["feed", "verb", "A1"], ["photo", "noun", "A1"], ["ill", "adjective", "A1"], ["baby", "noun", "A1"]], [["illness", "noun", "A2"], ["sign in", "phrasal verb", "A2"], ["apple", "noun", "A2"], ["follow", "verb", "A2"], ["die", "verb", "A2"], ["job", "noun", "A2"], ["last name", "noun", "A2"], ["speed", "noun", "A2"], ["job", "noun", "A2"], ["cold", "adjective", "A2"], ["take", "verb", "A2"], ["university", "noun", "A2"]], [["funny", "adjective", "B1"], ["weak", "adjective", "B1"], ["wheelchair", "noun", "B1"], ["stone", "noun", "B1"], ["painful", "adjective", "B1"], ["risk", "noun", "B1"], ["secondary", "adjective", "B1"], ["possibility", "noun", "B1"], ["employer", "noun", "B1"], ["afterwards", "adverb", "B1"], ["employee", "noun", "B1"], ["industrial", "adjective", "B1"]], [["unequal", "adjective", "B2"], ["gadget", "noun", "B2"], ["segment", "noun", "B2"], ["skim", "verb", "B2"], ["sensory", "adjective", "B2"], ["weight", "noun", "B2"], ["ignorance", "noun", "B2"], ["copy in", "phrasal verb", "B2"], ["entertain", "verb", "B2"], ["straight", "adjective", "B2"], ["raft", "noun", "B2"], ["alert", "adjective", "B2"]], [["supersonic", "adjective", "C1"], ["thoughtless", "adjective", "C1"], ["glacial", "adjective", "C1"], ["miffed", "adjective", "C1"], ["unequally", "adverb", "C1"], ["disloyal", "adjective", "C1"], ["caricature", "verb", "C1"], ["defeatism", "noun", "C1"], ["bloated", "adjective", "C1"], ["cashew", "noun", "C1"], ["quintessential", "adjective", "C1"], ["shrewd", "adjective", "C1"]], [["fingermark", "noun", "C2"], ["bunt", "verb", "C2"], ["godawful", "adjective", "C2"], ["dress code", "noun", "C2"], ["blackshirt", "noun", "C2"], ["mizzen", "noun", "C2"], ["deserts", "noun", "C2"], ["forbearance", "noun", "C2"], ["thrive on", "phrasal verb", "C2"], ["skittishly", "adverb", "C2"], ["flinch from", "phrasal verb", "C2"], ["balloon tyre", "noun", "C2"]]]
          })
      } else {
        fetch(apiURL)
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
        number={this.state.questionCounter}
        onClick = { this.handleClick }
        />
    }
   

    handleClick(known, word){
  
      var newLevel = 0
      var newQuestion = 0
      var newQuestionCounter = this.state.questionCounter + 1
      var newKnown = this.state.known
      var newUnknown = this.state.unknown
      var newKnownWords = this.state.knownWords
      var newUnKnownWords = this.state.unknownWords
      var newResult = this.state.result
      var newVocabSize = 0
  
      if (known) {
        newKnown[this.state.currentLevel] += 1
        newKnownWords[this.state.currentLevel].push(word)
      }
      else {
        newUnknown[this.state.currentLevel] += 1
        newUnKnownWords[this.state.currentLevel].push(word)

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
      // console.log(this.state.knownWords)
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