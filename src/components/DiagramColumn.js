import React, { Component } from 'react'

class DiagramColumn extends Component {

    render() {
        var {level, known, unknown} = this.props

        var knownWords = known.map ( (word) => <p>{word}</p> )
        var unknownWords = unknown.map ( (word) => <p>{word}</p> )
        var levelClass = "diagram-level letter-" + level 
        var columnClass = "diagram-column level-" + level 
        columnClass += known.length + unknown.length > 0 ? " diagram-bg-"+ level : " nowords"

        return (
            <div className={columnClass}>
                <div className={levelClass}>{this.props.level}</div>
                <div className="unknown">{unknownWords}</div>
                <div className="known">{knownWords}</div>
            </div>
        )
    }
}

export default DiagramColumn
