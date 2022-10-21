import React from "react";

import Controls from "./Controls";

class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            breakLength: 5,
            sessLength: 25,
            timer: 1500,
            intervalID:'',
            timerState: 'stopped',
            timerType: 'Session'

        }
        this.startTimer = this.startTimer.bind(this);
        this.decrementTimer = this.decrementTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    // Begin timer countdown 
    startTimer(){
        this.setState({
            intervalID: setInterval(() => {
            this.decrementTimer()    
            }, 1000)
        });
    }
    
    // Decrement timer
    decrementTimer() {
        this.setState({
            timer: this.state.timer - 1
        });
    }
    
    // Set break length

    // Set session length

    // Increase or decrese break and session lengths

    // Timer state control - stopped, active 



    
    // Play audio
    
    // Display time in mm:ss format 
    displayTime(){
        if(this.state.timer === '0') return "00:00";
        let minutes = Math.floor(this.state.timer / 60);
        let seconds = this.state.timer - minutes * 60;
        // If there's under 10 seconds or minutes left, add '0' to keep time format mm:ss
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        // Add colon in between minutes and seconds
        return minutes + ':' + seconds; 
    }
    // Reset timer
    resetTimer(){
        this.setState({
            breakLength: 5,
            sessLength: 25,
            timer: 1500,
            intervalID: '',
            timerState: 'stopped',
            timerType: 'Session'
        });
    }
    render(){
        return (
            <div className="container">
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
                title="Session Length"
                titleID="session-label"
                // Add onClick to set session length
                />
                {/* Countdown Clock */}
                <div className="timer">
                    <div className="timer-wrapper">
                        <div id="timer-label">Session</div>
                        <div id="time-left">{this.displayTime()}</div>
                        <button id="reset"
                        onClick={this.resetTimer}
                        >
                    <i class="fa-solid fa-arrow-rotate-right"></i>
                    </button>
                    </div>
                </div>
                <div className="timer-control">
                    <button id="start_stop"
                    // Add onClick that starts and stops timer
                    >
                        <i className="fa-solid fa-play"></i>
                        <i className="fa-solid fa-pause"></i>
                    </button>
                </div>
                <audio id="beep" src="public\mixkit-racing-countdown-timer-1051.wav"/>
            </div>
        );
    }
}

export default Timer; 