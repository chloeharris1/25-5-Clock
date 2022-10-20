import React from "react";

class Controls extends React.Component {
    render(){
        return (
            <div className="length-control">
                <div id={this.props.titleID} className="title">{this.props.title}</div>
                <button
                className="btn-row"
                id={this.props.decID}
                // Add onClick prop
                value='-'>
                    <i class="fa-solid fa-angle-down"></i>
                </button>
                {/* Displays current length of timer */}
                <div className="btn-row"
                id={this.props.lengthID}>{this.props.length}</div>
                <button 
                className="btn-row"
                id={this.props.incID}
                // Add onClick prop
                value="+">
                    <i class="fa-solid fa-angle-up"></i>
                </button> 
            </div>
        );
    }
}

export default Controls;
