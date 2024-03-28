import React, { useEffect, useRef, useState } from 'react';
import './Confetti.css';
import { Link } from "react-router-dom";

const Pong = () => {
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState('');

    useEffect(() => {
        if (gameOver) {
            generateConfetti();
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth / 1.5;
        canvas.height = window.innerHeight / 1.5;

        let ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 10,
            velocityX: 8,
            velocityY: 8,
            speed: 17,
            color: "#fff"
        };

        let player1 = {
            x: 0,
            y: (canvas.height - 100) / 2,
            width: 10,
            height: 100,
            score: 0,
            color: "#fff",
            moveUp: false,
            moveDown: false
        };

        let player2 = {
            x: canvas.width - 10,
            y: (canvas.height - 100) / 2,
            width: 10,
            height: 100,
            score: 0,
            color: "#fff",
            moveUp: false,
            moveDown: false
        };

        const keyDownHandler = (event) => {
            switch(event.key) {
                case 'w': player1.moveUp = true; break;
                case 's': player1.moveDown = true; break;
                case 'ArrowUp': player2.moveUp = true; break;
                case 'ArrowDown': player2.moveDown = true; break;
            }
        };

        const keyUpHandler = (event) => {
            switch(event.key) {
                case 'w': player1.moveUp = false; break;
                case 's': player1.moveDown = false; break;
                case 'ArrowUp': player2.moveUp = false; break;
                case 'ArrowDown': player2.moveDown = false; break;
            }
        };

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        const collision = (b, p) => {
            b.top = b.y - b.radius;
            b.bottom = b.y + b.radius;
            b.left = b.x - b.radius;
            b.right = b.x + b.radius;

            p.top = p.y;
            p.bottom = p.y + p.height;
            p.left = p.x;
            p.right = p.x + p.width;

            return b.right > p.left && b.top < p.bottom && b.left < p.right && b.bottom > p.top;
        };

        const drawCourt = () => {
            ctx.strokeStyle = "#FFF";
            ctx.setLineDash([10, 15]);
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
        };
        
        /* const drawArc = (x, y, r, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI*2, true);
            ctx.closePath();
            ctx.fill();
        };
        
        const drawText = (text, x, y) => {
            ctx.fillStyle = "#FFF";
            ctx.font = "50px Arial";
            ctx.fillText(text, x, y);
        };
        
        const drawRect = (x, y, w, h, color) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);
        };
        const drawCourt = () => {

            drawRect(0, 0, canvas.width, canvas.height, '#000');

            ctx.strokeStyle = "#FFF";
            ctx.setLineDash([10, 15]);
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.stroke();

            ctx.setLineDash([]);

            ctx.strokeRect(0, 0, canvas.width, canvas.height);
        }; */
        const resetBall = () => {
            if (player1.score === 7 || player2.score === 7) {
                setGameOver(true);
                setWinner(player1.score === 7 ? 'Player 1' : 'Player 2');
                return;
            }

            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.velocityX = 8;
            ball.velocityY = 8;
        };

        const update = () => {
            if (player1.moveUp && player1.y > 0) player1.y -= 10;
            if (player1.moveDown && player1.y < canvas.height - player1.height) player1.y += 10;
            if (player2.moveUp && player2.y > 0) player2.y -= 10;
            if (player2.moveDown && player2.y < canvas.height - player2.height) player2.y += 10;

            ball.x += ball.velocityX;
            ball.y += ball.velocityY;

            if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
                ball.velocityY = -ball.velocityY;
            }

            if (collision(ball, player1)) {
                ball.velocityX = -ball.velocityX;
                ball.x = player1.x + player1.width + ball.radius;
            }

            if (collision(ball, player2)) {
                ball.velocityX = -ball.velocityX;
                ball.x = player2.x - ball.radius;
            }

            if (ball.x - ball.radius < 0) {
                player2.score++;
                resetBall();
            } else if (ball.x + ball.radius > canvas.width) {
                player1.score++;
                resetBall();
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = ball.color;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
            ctx.fill();

            ctx.fillStyle = player1.color;
            ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

            ctx.fillStyle = player2.color;
            ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

            ctx.font = '35px Arial';
            ctx.fillText(player1.score, 100, 50);
            ctx.fillText(player2.score, canvas.width - 100, 50);
        };

        const gameInterval = setInterval(() => {
            update();
            draw();
        }, 1000 / 60);

        return () => {
            clearInterval(gameInterval);
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        };
    }, [gameOver]);

    const generateConfetti = () => {
        
      };
    return (
        <>
            {gameOver ? (
                <div className="wrapper" id="confetti-wrapper">
                    <div className="modal">
                        <span className="emoji round">🏆</span>
                        <h1>Congratulations, {winner}</h1>
                        
                            <Link to="/game">
                <button
                  className="btn btn-primary btn-lg w-100 d-flex justify-content-between align-items-center"
                  
                >
                  <span>Play again</span>
                </button>
              </Link>

                        
                    </div>
                </div>
            ) : (
                <canvas ref={canvasRef}></canvas>
            )}
        </>
    );
};

export default Pong;
