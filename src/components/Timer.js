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
                {/* Length Controls */}
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
                {/* Countdown Clock */}
                <div id="timer-label">Session -or- Break</div>
                <div id="time-left">25:00</div>
                <button id="start_stop"
                // Add onClick that starts and stops timer
                >
                    <i class="fa-solid fa-play"></i>
                    <i class="fa-solid fa-pause"></i>
                </button>
                <button id="reset"
                // Add onClick to reset timer
                >
                    <i class="fa-solid fa-arrows-rotate"></i>
                </button>
            </div>
        );
    }
}

export default Timer; 