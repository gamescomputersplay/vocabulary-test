import React from 'react';
import { ReactComponent as YesSVG } from '../img/yes.svg'
import { ReactComponent as NoSVG } from '../img/no.svg'

const iconSize = 35

function Question (props) {
  let questionClassname = "question level-" + props.level
  let questionLetterClassname = "level-letter letter-" + props.level

    return ( 
      <div className={questionClassname}>
        <div className="question-word">{props.word}</div>
        <div className="question-pos">{props.pos}</div>
        <button className="question-button button-yes" onClick = {() => {props.onClick(true, props.word, props.definition)}}>
          <YesSVG width={iconSize} height={iconSize} fill="#016617" />
          </button>
        <button className="question-button button-no"  onClick = {() => {props.onClick(false, props.word, props.definition)}}>
          <NoSVG  width={iconSize}  height={iconSize} fill="#c71010" />
          </button>
        <div className="question-definition">{props.definition}</div>
        <div className="question-number">#{props.number + 1}</div>
        <div className={questionLetterClassname}>{props.level}</div>
      </div>
    )
  }

  export default Question;