import React, { useEffect } from "react";
import * as THREE from "three";
import { MeshLambertMaterial } from "three";

const Player3D1 = () => {
  useEffect(() => {
    let container, renderer, camera, scene, ball, paddle1, paddle2, mainLight;

    const WIDTH = 700,
      HEIGHT = 500,
      VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000,
      FIELD_WIDTH = 1200,
      FIELD_LENGTH = 3000,
      BALL_RADIUS = 20,
      PADDLE_WIDTH = 200,
      PADDLE_HEIGHT = 30;

    function startBallMovement() {
      var direction = Math.random() > 0.5 ? -1 : 1;
      ball.$velocity = {
        x: 0,
        z: direction * 20,
      };
      ball.$stopped = false;
    }

    function processCpuPaddle() {
      var ballPos = ball.position,
        cpuPos = paddle2.position;

      if (cpuPos.x - 100 > ballPos.x) {
        cpuPos.x -= Math.min(cpuPos.x - ballPos.x, 6);
      } else if (cpuPos.x - 100 < ballPos.x) {
        cpuPos.x += Math.min(ballPos.x - cpuPos.x, 6);
      }
    }

    function processBallMovement() {
      if (!ball.$velocity) {
        startBallMovement();
      }

      if (ball.$stopped) {
        return;
      }

      updateBallPosition();

      if (isSideCollision()) {
        ball.$velocity.x *= -1;
      }

      if (isPaddle1Collision()) {
        hitBallBack(paddle1);
      }

      if (isPaddle2Collision()) {
        hitBallBack(paddle2);
      }

      if (isPastPaddle1()) {
        scoreBy("player2");
      }

      if (isPastPaddle2()) {
        scoreBy("player1");
      }
    }

    function isPastPaddle1() {
      return ball.position.z > paddle1.position.z + 100;
    }

    function isPastPaddle2() {
      return ball.position.z < paddle2.position.z - 100;
    }

    function updateBallPosition() {
      var ballPos = ball.position;

      ballPos.x += ball.$velocity.x;
      ballPos.z += ball.$velocity.z;

      ballPos.y = -(((ballPos.z - 1) * (ballPos.z - 1)) / 5000) + 435;
    }

    function isSideCollision() {
      var ballX = ball.position.x,
        halfFieldWidth = FIELD_WIDTH / 2;
      return (
        ballX - BALL_RADIUS < -halfFieldWidth ||
        ballX + BALL_RADIUS > halfFieldWidth
      );
    }

    function hitBallBack(paddle) {
      ball.$velocity.x = (ball.position.x - paddle.position.x) / 5;
      ball.$velocity.z *= -1;
    }

    function isPaddle2Collision() {
      return (
        ball.position.z - BALL_RADIUS <= paddle2.position.z &&
        isBallAlignedWithPaddle(paddle2)
      );
    }

    function isPaddle1Collision() {
      return (
        ball.position.z + BALL_RADIUS >= paddle1.position.z &&
        isBallAlignedWithPaddle(paddle1)
      );
    }

    function isBallAlignedWithPaddle(paddle) {
      var halfPaddleWidth = PADDLE_WIDTH / 2,
        paddleX = paddle.position.x,
        ballX = ball.position.x;
      return (
        ballX > paddleX - halfPaddleWidth && ballX < paddleX + halfPaddleWidth
      );
    }

    function scoreBy(playerName) {
      addPoint(playerName);
      updateScoreBoard();
      stopBall();
      setTimeout(reset, 2000);
    }

    function updateScoreBoard() {

    }

    function stopBall() {
      ball.$stopped = true;
    }

    function addPoint(playerName) {

    }

    function startRender() {
      render();
    }

    function stopRender() {

    }

    function render() {
      requestAnimationFrame(render);

      processBallMovement();
      processCpuPaddle();

      renderer.render(scene, camera);
    }

    function reset() {
      ball.position.set(0, 0, 0);
      ball.$velocity = null;
    }

    function init() {
      container = document.getElementById("container");

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(WIDTH, HEIGHT);
      renderer.setClearColor(0x9999bb, 1);
      container.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
      camera.position.set(0, 100, FIELD_LENGTH / 2 + 500);

      scene = new THREE.Scene();
      scene.add(camera);

      var fieldGeometry = new THREE.BoxGeometry(FIELD_WIDTH, 5, FIELD_LENGTH),
        fieldMaterial = new THREE.MeshLambertMaterial({ color: 0x003300 });
      var field = new THREE.Mesh(fieldGeometry, fieldMaterial);
      field.position.set(0, -50, 0);

      scene.add(field);
      paddle1 = addPaddle();
      paddle1.position.z = FIELD_LENGTH / 2;
      paddle2 = addPaddle();
      paddle2.position.z = -FIELD_LENGTH / 2;

      var ballGeometry = new THREE.SphereGeometry(BALL_RADIUS, 16, 16),
        ballMaterial = new THREE.MeshLambertMaterial({ color: 0xcc0000 });
      ball = new THREE.Mesh(ballGeometry, ballMaterial);
      scene.add(ball);

      camera.lookAt(ball.position);

      mainLight = new THREE.HemisphereLight(0xffffff, 0x003300);
      scene.add(mainLight);

      camera.lookAt(ball.position);

      container.style.display = "flex";
      container.style.justifyContent = "center";
      container.style.alignItems = "center";

      startRender();
      const handleMouseMove = (e) => {
        var mouseX = e.clientX;
        camera.position.x = paddle1.position.x =
          -(((WIDTH - mouseX) / WIDTH) * FIELD_WIDTH) + FIELD_WIDTH / 2;
      };

      window.addEventListener("mousemove", handleMouseMove);
      renderer.domElement.style.cursor = "none";

      return () => {

        stopRender();
        window.removeEventListener("mousemove", handleMouseMove);
        container.removeChild(renderer.domElement);
      };
    }

    function addPaddle() {
      var paddleGeometry = new THREE.BoxGeometry(
          PADDLE_WIDTH,
          PADDLE_HEIGHT,
          10,
        ),
        paddleMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc }),
        paddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
      scene.add(paddle);
      return paddle;
    }

    init();
    return () => {

      renderer.dispose();
    };
  }, []);

  return <div id="container"></div>;
};

export default Player3D1;
