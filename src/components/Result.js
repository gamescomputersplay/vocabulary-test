import React, { Component } from 'react'
import Diagram from './Diagram'
import {langName, levels} from '../Consts'

import ReactGA from "react-ga4";
import { TwitterShareButton, TwitterIcon } from "react-share";


class Result extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            showButton: false,
            showShare: false
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
        setTimeout (
            () => this.setState(
                {showShare: true}
            ),
            500
        )
        ReactGA.event({
            category: 'results',
            action: 'level',
            label: this.props.result
          });
          ReactGA.event({
            category: 'results',
            action: 'vocab',
            label: this.props.vocabSize
          });
    }


    render() {
        
        let shareUrl = "http://how-many-words-do-you-know.com"
        let shareText = "I know approximately " + this.props.vocabSize + " " + langName[this.props.language] 
                        + " words, my vocabulary level is " + this.levelMessage(this.props.result) +". Tested with "

        var button = null
        var share = null

        if (this.state.showButton) {
            button = <button className="button-again" onClick={() => this.props.goAgain(this.props.language)}>Take the test again</button>
        }
        if (this.state.showShare) {
            share = (
            <span className="social-buttons">
                <TwitterShareButton url={shareUrl} title={shareText}>
                    <TwitterIcon size="30" round="True" />
                </TwitterShareButton>
            </span>
            )
        }

        return (
            <div>
                <h2 class="cefr">You know approximately {this.props.vocabSize} {langName[this.props.language]} words. Your vocabulary level is {this.levelMessage(this.props.result)}
                &nbsp;{share}
                </h2>
                

                <p class="cefrlink">You can read more about CEFR levels <a href="https://en.wikipedia.org/wiki/Common_European_Framework_of_Reference_for_Languages">here</a>.</p>
                
                <Diagram known={this.props.knownWords} unknown={this.props.unknownWords} />
                {button}
                
            </div>
        )
    }
}

export default Result
