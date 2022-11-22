import React, { Component } from 'react'
import { ReactComponent as EnSVG } from '../img/gb.svg'
import { ReactComponent as DeSVG } from '../img/de.svg'
import { ReactComponent as FrSVG } from '../img/fr.svg'
import { ReactComponent as CnSVG } from '../img/cn.svg'
import { ReactComponent as EsSVG } from '../img/es.svg'

const flagWid = 24
const flagHgt = 18
class Intro extends Component {

    
    render() {
        return (
            <div className="introtext">
                <p>Welcome to the Vocabulary test!</p>

                <p>Here you can get an estimate of your vocabulary size in just a couple of minutes.</p>

                <p>This is how it works: go through a series of flashcards and indicate if you <span className="green">know this word (green tick)</span> or <span className="red">don’t (red cross)</span>.</p>
                    
                <p>The test starts with the most basic words and will automatically increase the difficulty if you easily go through the simple parts.
                <br/><b>Words are randomly chosen every time you take the test (no two tests are the same).</b></p>

                <p>Test can measure your knowledge in a number of languages: <b>English, French, German, Spanish, Chinese.</b></p>
                
                <p>Pick the language you would like to test.</p>

                
                <div className='start-buttons'>
                    <button className="button-start" onClick={() => this.props.clickStart("en")}>
                        <EnSVG width={flagWid} height={flagHgt} fill="#016617" />
                        <span><b>EN</b></span>
                    </button>
                    <button className="button-start" onClick={() => this.props.clickStart("de")}>
                        <DeSVG width={flagWid} height={flagHgt} fill="#016617" />
                        <span><b>DE</b></span>
                    </button>
                    <button className="button-start" onClick={() => this.props.clickStart("fr")}>
                        <FrSVG width={flagWid} height={flagHgt} fill="#016617" />
                        <span><b>FR</b></span>
                    </button>
                    <button className="button-start" onClick={() => this.props.clickStart("es")}>
                        <EsSVG width={flagWid} height={flagHgt} fill="#016617" />
                        <span><b>ES</b></span>
                    </button>
                    <button className="button-start" onClick={() => this.props.clickStart("cn")}>
                        <CnSVG width={flagWid} height={flagHgt} fill="#016617" />
                        <span><b>CN</b></span>
                    </button>

                </div>
            </div>
        )
    }
}

export default Intro
