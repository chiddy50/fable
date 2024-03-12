"use client"

import { useState, useEffect } from "react";

export default function CountdownComponent({ date }) {
  const [countdownText, setCountdownText] = useState("");

  useEffect(() => {
    // Set the date we're counting down to
    const countDownDate = new Date(date).getTime();

    // Update the count down every 1 second
    const intervalId = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result
      if (distance < 0) {
        clearInterval(intervalId);
        setCountdownText("EXPIRED");
      } else {
        setCountdownText(`${days}d ${hours}h : ${minutes}m : ${seconds}s`);
      }
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [date]);

  return (
    <span className={ countdownText === "EXPIRED" ? "text-red-500" : "text-blue-500" }>{countdownText}</span>
  );
}