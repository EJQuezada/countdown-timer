import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [countdownStarted, setCountdownStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        if (countdownStarted && eventDate) {
            const countdownInterval = setInterval(() => {
                const currentTime = new Date().getTime();
                const eventTime = new Date(eventDate).getTime();
                let remainingTime = eventTime - currentTime;

                if (remainingTime <= 0) {
                    remainingTime = 0;
                    clearInterval(countdownInterval);
                    alert("Countdown complete!");
                }

                setTimeRemaining(remainingTime);
            }, 1000);

            return () => clearInterval(countdownInterval);
        }

    }, [countdownStarted, eventDate, timeRemaining]);

    useEffect(() => {
        if (countdownStarted) {
            document.title = eventName;
        }
    }, [countdownStarted, eventName]);

    const handleSetCountdown = () => {
        setCountdownStarted(true);
        localStorage.setItem("eventDate", eventDate);
        localStorage.setItem("eventName", eventName);
    };

    const handleStopCountdown = () => {
        setCountdownStarted(false);
        setTimeRemaining(0);
    };

    const handleResetCountdown = () => {
        setCountdownStarted(false);
        setEventDate("");
        setEventName("");
        setTimeRemaining(0);
        localStorage.removeItem("eventDate");
        localStorage.removeItem("eventName");
    };

    return (
        <div className="countdown-timer-container">
            <h2 className="countdown-name">
                {countdownStarted ? eventName: "Countdown Timer"}
            </h2>

            {!countdownStarted ? (
                <form className="countdown-form">
                    <label htmlFor="title">Event Name</label>
                    <input
                        name="title"
                        type="text"
                        placeholder="Enter event name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                    
                    <label htmlFor="date-picker">Event Date</label>
                    <input
                        name="date-picker"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        onClick={(e) => (e.target.type = "date")}
                    />
                    <button onClick={handleSetCountdown}>Start Countdown</button>
                </form>
            )}
        
        <div className="control-buttons">
            <button onClick={handleStopCountdown}>Stop</button>
            <button onClick={handleResetCountdown}>Reset</button>
        </div>
            
        </div>
    );
};

export default CountdownTimer;