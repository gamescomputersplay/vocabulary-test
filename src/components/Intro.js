import React, { Component } from 'react'

class Intro extends Component {

    
    render() {
        return (
            <div className="introtext">
                <p>Welcome to the Vocabulary test!</p>

                <p>Here you can get an estimate of your vocabulary size in just a couple of minutes.</p>

                <p>This is how it works: go through a series of flashcards and indicate if you <span className="green">know this word (green tick)</span> or <span className="red">don’t (red cross)</span>.</p>
                    
                <p>The test starts with the most basic words and will automatically increase the difficulty if you easily go through the simple parts.</p>

                <p>At the end you get the estimation of your CEFR level and vocabulary size.</p>

                <p>Test words are randomly chosen every time you take the test.</p>

                <button className="button-start" onClick={() => this.props.clickStart("en")}>Start</button>
            </div>
        )
    }
}

export default Intro
