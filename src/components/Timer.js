import React from "react";

import Controls from "./Controls";

// Created a function to account for timer drifting for a more accurate timer
const accurateInterval = function (func, time) {
    let stop, expected, timeout, callback; 

    expected = Date.now() + time;
    timeout = null; 
    callback = function () {
        expected += time; 
        timeout = setTimeout(callback, expected - Date.now());
        console.log(expected - Date.now())
        return func();
    };
    stop = function () {
        return clearTimeout(timeout);
    };

    timeout = setTimeout(callback, expected - Date.now());
    return {
        stop: stop
    };
};


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
        this.setBreakLength = this.setBreakLength.bind(this);
        this.setSessLength = this.setSessLength.bind(this);
        this.lengthControl = this.lengthControl.bind(this);
        this.timerControl = this.timerControl.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.decrementTimer = this.decrementTimer.bind(this);
        this.typeControl = this.typeControl.bind(this);
        this.playAudio = this.playAudio.bind(this);
        this.switchType = this.switchType.bind(this);
        this.displayTime = this.displayTime.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
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
        if(this.state.timerState === 'stopped'){
            this.startTimer();
            this.setState({ timerState: 'active'});
        } else {
            this.setState({timerState: 'stopped'});
            if(this.state.intervalID) {
                this.state.intervalID.stop();
            }
        }
    }
    
    // Start timer countdown 
    startTimer(){
        this.setState({
            intervalID: accurateInterval(() => {
            this.decrementTimer();
            this.typeControl();   
            }, 1000)
        });
    }
    
    // Decrement timer
    decrementTimer() {
        this.setState({
            timer: this.state.timer - 1
        });
    }

    // Switch between sessions and breaks
    typeControl(){
        let timer = this.state.timer;
        this.playAudio(timer);
        if(timer < 0){
            if(this.state.intervalID){
                this.state.intervalID.stop();
            }
            if(this.state.timerType === 'Session') {
                this.startTimer();
                this.switchType(this.state.breakLength * 60, 'Break');
            } else {
                this.startTimer();
                this.switchType(this.state.sessLength * 60, 'Session');
            }
        }
    }

    // Play audio when timer ends
    playAudio(_timer){
        if(_timer === 0){
            this.audioBeep.play();
        }
    }

    // Change text above timer when switching bewtween a session and break
    switchType(num, str){
        this.setState({
            timer: num,
            timerType: str
        });
    }

    // Display time in mm:ss format 
    displayTime(){
        if(this.state.timer < '0') return "00:00";
        let minutes = Math.floor(this.state.timer / 60);
        let seconds = this.state.timer - minutes * 60;
        // If there's under 10 seconds or minutes left, add '0' to keep time format mm:ss
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        // Display colon in between minutes and seconds
        return minutes + ':' + seconds; 
    }
    // Reset timer back to default values, clear interval
    resetTimer(){
        this.setState({
            breakLength: 5,
            sessLength: 25,
            timer: 1500,
            intervalID: '',
            timerState: 'inactive',
            timerType: 'Session'
        });
        if(this.state.intervalID){
            this.state.intervalID.stop();
        }
        this.audioBeep.pause();
        this.audioBeep.currentTime = 0;
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
                            <i className="fa-solid fa-arrow-rotate-right"></i>
                        </button>
                    </div>
                </div>
                {/* Start Stop Controls */}
                <div className="timer-control">
                    <button id="start_stop"
                    onClick={this.timerControl}
                    >
                        <i className="fa-solid fa-play"></i>
                        <i className="fa-solid fa-pause"></i>
                    </button>
                </div>
                {/* Audio clip, load on page load */}
                <audio id="beep" 
                preload="auto"
                ref={(audio) => {
                    this.audioBeep = audio;
                }}
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>
            </div>
        );
    }
}

export default Timer; 