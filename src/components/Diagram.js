import React, { Component } from 'react'
import {levels} from '../Consts'
import DiagramColumn from './DiagramColumn'


class Diagram extends Component {


    render() {
        var columns = levels.map (
            (level, index) => 
                <DiagramColumn 
                    known={this.props.known[index]} 
                    unknown={this.props.unknown[index]} 
                    level={level} 
                    />
            )
        return (
            <div className='diagram'>
                {columns} 
            </div>
        )
    }
}

export default Diagram
