import React, { Component } from 'react'
import Diagram from './Diagram'
import {levels} from '../Consts'


class Result extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             showButton: false
        }
    }
        
    levelMessage(levelNum){
        if ( levelNum === -1 ) {
          return "lower than A1"
        }
        return levels[levelNum]
      }

    componentDidMount() {
        setTimeout (
            () => this.setState(
                {showButton: true}
            ),
            1000
        )
    }


    render() {
        var button = null
        if (this.state.showButton) {
            button = <button className="button-again" onClick={() => this.props.goAgain()}>Take the test again</button>
        }

        return (
            <div>
                <h2 class="cefr">Your vocabulary level is {this.levelMessage(this.props.result)}</h2>
                <p class="cefrlink">You can read more about CEFR levels <a href="https://en.wikipedia.org/wiki/Common_European_Framework_of_Reference_for_Languages">here</a>.</p>
                <h2>You know approximately {this.props.vocabSize} words</h2>
                <Diagram known={this.props.knownWords} unknown={this.props.unknownWords} />
                {button}
            </div>
        )
    }
}

export default Result
