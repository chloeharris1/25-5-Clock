import React from "react";

import Controls from "./Controls";

class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            breakLength: 5,
            sessLength: 25

        }
    }
    render(){
        return (
            <div>
                <Controls
                decID="break-decrement"
                length={this.state.breakLength}
                lengthID="break-length"
                incID="break-increment"
                title="Break Length"
                titleID="break-label"
                // Add onClick to set break length
                />
                <Controls 
                decID="session-decrement"
                length={this.state.sessLength}
                lengthID="session-length"
                incID="session-increment"
                title="Session-Length"
                titleID="session-label"
                // Add onClick to set session length
                />
            </div>
        );
    }
}

export default Timer; 