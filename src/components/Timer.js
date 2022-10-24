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
            timerState: 'inactive',
            timerType: 'Session'

        }
        this.startTimer = this.startTimer.bind(this);
        this.decrementTimer = this.decrementTimer.bind(this);
        this.setBreakLength = this.setBreakLength.bind(this);
        this.setSessLength = this.setSessLength.bind(this);
        this.lengthControl = this.lengthControl.bind(this);
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
    setBreakLength(e){
        this.lengthControl(
            'breakLength',
            e.currentTarget.value,
            this.state.breakLength,
            'Session'
        );
    }

    // Set session length
    setSessLength(e){
        this.lengthControl(
            'sessLength',
            e.currentTarget.value,
            this.state.sessLength,
            'Break'
        );
    }

    // Increase or decrease break and session lengths
    lengthControl(stateUpdate, operator, currentlength, timerType) {
        if(this.state.timerState === 'active') {
            return;
        }
        if(this.state.timerType === timerType) {
            // Decrement timer if current length is more than 1 minute
            if(operator === '-' && currentlength !==1) {
                this.setState({
                    [stateUpdate]: currentlength - 1
                });
            // Increment timer if current length is under 60 minutes
            } else if (operator === '+' && currentlength !==60) {
                this.setState({
                    [stateUpdate]: currentlength + 1
                });
            }
            // Update timer state to reflect new length
        } else if(operator === '-' && currentlength !== 1) {
            this.setState({
                [stateUpdate]: currentlength -1,
                timer: currentlength * 60 - 60
            });
        } else if(operator === '+' && currentlength !==60){
            this.setState({
                [stateUpdate]: currentlength + 1,
                timer: currentlength * 60 + 60
            });
        }
    }
    
    // Timer state control - stopped, active 
    timerControl(){

    }

    // Play audio when timer ends
    playAudio(){
        
    }
    
    // Display time in mm:ss format 
    displayTime(){
        if(this.state.timer === '0') return "00:00";
        let minutes = Math.floor(this.state.timer / 60);
        let seconds = this.state.timer - minutes * 60;
        // If there's under 10 seconds or minutes left, add '0' to keep time format mm:ss
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        // Display colon in between minutes and seconds
        return minutes + ':' + seconds; 
    }
    // Reset timer
    resetTimer(){
        this.setState({
            breakLength: 5,
            sessLength: 25,
            timer: 1500,
            intervalID: '',
            timerState: 'inactive',
            timerType: 'Session'
        });
        clearInterval(this.state.intervalID);
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
                onClick={this.setBreakLength}
                />
                <Controls 
                decID="session-decrement"
                length={this.state.sessLength}
                lengthID="session-length"
                incID="session-increment"
                title="Session Length"
                titleID="session-label"
                onClick={this.setSessLength}
                />
                {/* Countdown Clock */}
                <div className="timer">
                    <div className="timer-wrapper">
                        <div id="timer-label">{this.state.timerType}</div>
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