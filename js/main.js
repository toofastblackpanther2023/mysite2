"use strict";

const quizStart = document.querySelector("#quiz-start");
const answerStart = document.querySelector("#answer-start");

const quizes = [
  {
    quiz: "例題.川崎工場第二工場から見える空港は？",
    answers: [
      { text: "成田国際空港", item: "../img/food/food1.png" },
      { text: "ロサンゼルス国際空港", item: "../img/food/food2.png" },
      { text: "羽田空港", item: "../img/food/food3.png" }
    ]
  },

  {
    quiz: "問1.建設工事における『発注者』の法的責任は？",
    answers: [
      { text: "「元方事業者責任」", item: "../img/food/food4.png" },
      { text: "「注文者責任」", item: "../img/food/food5.png" },
      { text: "「責任なし」", item: "../img/food/food6.png" }
    ]
  },
  {
    quiz: "問2.労働安全衛生法第3条第3項「建設工事の注文者等仕事を他人に請け負わせる者は、①、②等について、安全で衛生的な作業の遂行をそこなうおそれのある条件を附さないように③しなければならない。」で正しい組み合わせは？",
    answers: [
      { text: "①･･･施工方法 ②･･･工期 ③･･･配慮", item: "../img/food/food7.png" },
      { text: "①･･･足場工事 ②･･･塗装 ③･･･監視", item: "../img/food/food8.png" },
      { text: "①･･･運搬車両 ②･･･重機 ③･･･規制", item: "../img/food/food9.png" }
    ]
  },
  {
    quiz: "問3.工事担当者が労働安全衛生法第3条第3項の安全配慮義務を怠った場合、問われる責任は？",
    answers: [
      { text: "「刑事責任」及び「民事責任」", item: "../img/food/food10.png" },
      { text: "「自己責任」及び「連帯責任」", item: "../img/food/food11.png" },
      { text: "「説明責任」及び「証明責任」", item: "../img/food/food12.png" }
    ]
  },
  {
    quiz: "問4.工事担当者は最新情報を自ら積極的に収集し、共有することが大事である。共有する関係者の組み合わせは？",
    answers: [
      { text: "「浮島親交会と外部業者」、「管理課と環境安全課と品質保証部と守衛」、「製造一課と製造二課と製造三課」", item: "../img/food/food13.png" },
      { text: "「工務課と製造課と元請」、「工務課で機械Gと電計Gと化学Gと建設T」、「工務課と管理課」", item: "../img/food/food14.png" },
      { text: "「消防署と警察と工務課」、「工務課機械G一部と近隣工場の工事担当課」、「産業医と環境安全課」", item: "../img/food/food15.png" }
    ]
  },
  {
    quiz: "問5.工事担当者の心構えとして、最も適切なのは？",
    answers: [
      { text: "足場上で安全帯をしていないかのように見えた人がいたので、状況をしっかり確認せずに一方的に怒鳴りつけて、工事を中断した。", item: "../img/food/food16.png" },
      { text: "過去の「死亡災害」は過去のことなので、参考にならない。忘れてしまっていい。", item: "../img/food/food17.png" },
      { text: "安全対策は「発注範囲内」であることを理解する。「事故」や「災害」のリスクを取って実施する工事に価値はない。", item: "../img/food/food18.png" }
    ]
  },
];

let n = 0;

quizStart.addEventListener("click", () => {
  if (m === n) {
    n = n + 1;
    const quizMain = document.querySelector('.quiz_main');
    const currentQuiz = quizes[n - 1]; // i番目の問題にアクセス

    // 問題文を表示
    quizMain.innerHTML = `<div>${currentQuiz.quiz}</div>`;

    // 回答を表示
    currentQuiz.answers.forEach((answer, index) => {
      quizMain.innerHTML += `<div id="answer_${index + 1}"><img src="${answer.item}" width="30" height="30" alt="">${answer.text}</div>`;
    });
  }
});

let i = 0;
let m = 0;

answerStart.addEventListener("click", () => {
  if (m === i && n > i) {

    i = i + 1;

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    class Ball {
      constructor(canvas, paddle, isCorrect, imageSrc, x) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = x;
        this.y = 20;
        this.w = 40;
        this.h = 40;
        this.vx = rand(0, 2) * (Math.random() < 0.5 ? 1 : -1);
        this.vy = rand(1, 2);
        this.r = 15;
        this.isMissed = false;
        this.isCaughted = false;
        this.paddle = paddle;
        this.isCorrect = isCorrect; // ボールが正解かどうかのフラグ
      }

      getMissedStatus() {
        return this.isMissed;
      }

      catch() {
        this.isCaughted = true;
        if ((i - m) === 1) {
          m++;
        }

      }

      reposition(paddleTop) {
        this.y = paddleTop - this.r;
      }

      getX() {
        return this.x;
      }

      getY() {
        return this.y;
      }

      getR() {
        return this.r;
      }

      update() {
        if (this.isCaughted === true) {
          if (this.paddle) {
            this.x = this.paddle.x + this.paddle.w / 2 - this.w / 2 + 20;
            this.y = this.paddle.y - this.h + 10;
          }
        } else {
          this.x += this.vx;
          this.y += this.vy;

          if ((this.y - this.r > this.canvas.height)) {
            this.isMissed = true;
          }

          if (
            this.x - this.r < 0 ||
            this.x + this.r > this.canvas.width
          ) {
            this.vx *= -1;
          }

          if (
            this.y - this.r < 0
          ) {
            this.vy *= -1;
          }
        }
      }

      draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
      }
    }

    class Paddle {
      constructor(canvas, game) {
        this.canvas = canvas;
        this.game = game;
        this.ctx = this.canvas.getContext('2d');
        this.w = 150;
        this.h = 150;
        this.x = this.canvas.width / 2 - (this.w / 2);
        this.y = this.canvas.height - 150;
        this.mouseX = this.x;
        this.addHandler();
      }

      addHandler() {
        document.addEventListener('mousemove', e => {
          this.mouseX = e.clientX;
        });
      }

      update(ball) {
        const ballBottom = ball.getY() + ball.getR();
        const paddleTop = this.y;
        const ballTop = ball.getY() - ball.getR();
        const paddleBottom = this.y + this.h - 120;
        const ballCenter = ball.getX();
        const paddleLeft = this.x + 50;
        const paddleRight = this.x + this.w - 40;

        if (
          ballBottom > paddleTop &&
          ballTop < paddleBottom &&
          ballCenter > paddleLeft &&
          ballCenter < paddleRight
        ) {
          ball.catch();
          ball.reposition(paddleTop)
        }

        // キャッチ後にマウスが左端に移動したときに正解をチェック
        if (ball.isCorrect && ball.isCaughted && this.x < -5 && !this.checkedAnswer) {
          this.game.showResult(true); // 正解の場合は「正解」を表示
          this.checkedAnswer = true;
          // console.log("judge/good");
        } else if (!ball.isCorrect && ball.isCaughted && this.x < -5 && !this.checkedAnswer) {
          this.game.showResult(false); // 不正解の場合は「不正解」を表示
          this.checkedAnswer = true;
          // console.log("judge/bad");
        }

        const rect = this.canvas.getBoundingClientRect();
        this.x = this.mouseX - rect.left - (this.w / 2);

        // if (this.x < 0) {
        //   this.x = 0;
        // }
        // if (this.x + this.w > this.canvas.width) {
        //   this.x = this.canvas.width - this.w;
        // }
        if (this.x < -55) {
          this.x = -60;  // パドルが少し外に出てもよい範囲を設定
        }
        if (this.x + this.w > this.canvas.width + 50) {  // 50pxくらいパドルを画面外に出す
          this.x = this.canvas.width - this.w + 50;
        }
        
      }

      draw() {
        this.ctx.drawImage(this.game.paddleImage, this.x, this.y, this.w, this.h);
      }
    }
    class Shop {
      constructor(canvas, game) {
        this.canvas = canvas;
        this.game = game;
        this.ctx = this.canvas.getContext('2d');
        this.w = 400;
        this.h = 150;
        this.x = 140;
        this.y = -10;
      }

      draw() {
        this.ctx.drawImage(this.game.shopImage, this.x, this.y, this.w, this.h);
      }
    }
    class Game {
      constructor(canvas, resultElementId) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.resultElement = document.getElementById(resultElementId);
        this.paddleImage = new Image();
        this.backgroundImage = new Image();
        this.backgroundImage.src = '../img/backsky.png';
        this.paddleImage.src = '../img/person.png';
        this.paddle = new Paddle(this.canvas, this);
        this.shopImage = new Image();

        this.shop = new Shop(this.canvas, this);
        if (i === 1) {
          this.balls = [
            new Ball(this.canvas, this.paddle, false, '../img/food/food1.png', rand(30, 200)),
            new Ball(this.canvas, this.paddle, false, '../img/food/food2.png', rand(200, 400)),
            new Ball(this.canvas, this.paddle, true, '../img/food/food3.png', rand(400, 600)) // 1つだけ正解のボールを設定
          ];
          this.shopImage.src = '../img/shop/shop1.png';
        } else if (i === 2) {
          this.balls = [
            new Ball(this.canvas, this.paddle, false, '../img/food/food4.png', rand(30, 200)),
            new Ball(this.canvas, this.paddle, true, '../img/food/food5.png', rand(200, 400)),
            new Ball(this.canvas, this.paddle, false, '../img/food/food6.png', rand(400, 600)) // 1つだけ正解のボールを設定
          ];
          this.shopImage.src = '../img/shop/shop2.png';
        }
        else if (i === 3) {
          this.balls = [
            new Ball(this.canvas, this.paddle, true, '../img/food/food7.png', rand(30, 200)),
            new Ball(this.canvas, this.paddle, false, '../img/food/food8.png', rand(200, 400)),
            new Ball(this.canvas, this.paddle, false, '../img/food/food9.png', rand(400, 600)) // 1つだけ正解のボールを設定
          ];
          this.shopImage.src = '../img/shop/shop3.png';
        } else if (i === 4) {
          this.balls = [
            new Ball(this.canvas, this.paddle, true, '../img/food/food10.png', rand(30, 200)),
            new Ball(this.canvas, this.paddle, false, '../img/food/food11.png', rand(200, 400)),
            new Ball(this.canvas, this.paddle, false, '../img/food/food12.png', rand(400, 600)) // 1つだけ正解のボールを設定
          ];
          this.shopImage.src = '../img/shop/shop4.png';
        } else if (i === 5) {
          this.balls = [
            new Ball(this.canvas, this.paddle, false, '../img/food/food13.png', rand(30, 200)),
            new Ball(this.canvas, this.paddle, true, '../img/food/food14.png', rand(200, 400)),
            new Ball(this.canvas, this.paddle, false, '../img/food/food15.png', rand(400, 600)) // 1つだけ正解のボールを設定
          ];
          this.shopImage.src = '../img/shop/shop5.png';
        } else if (i === 6) {
          this.balls = [
            new Ball(this.canvas, this.paddle, false, '../img/food/food16.png', rand(30, 200)),
            new Ball(this.canvas, this.paddle, false, '../img/food/food17.png', rand(200, 400)),
            new Ball(this.canvas, this.paddle, true, '../img/food/food18.png', rand(400, 600)) // 1つだけ正解のボールを設定
          ];
          this.shopImage.src = '../img/shop/shop6.png';
        }
        this.loop();
      }

      loop() {
        this.update();
        this.draw();

        requestAnimationFrame(() => {
          this.loop();
        });
      }

      update() {
        this.balls.forEach((ball, index) => {
          ball.update();
          this.paddle.update(ball);
          if (ball.isCaughted === true) {
            // 他のボールの状態を更新する
            this.balls.forEach((otherBall, otherIndex) => {
              if (index !== otherIndex) {
                otherBall.isCaughted = false;
              }
            });
          }
        });
      }

      draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.balls.forEach(ball => {
          ball.draw();
        });
        this.paddle.draw();
        this.shop.draw();
      }

      showResult(isCorrect) {
        const existingImg_1 = this.resultElement.querySelector(".img_1");
        if (existingImg_1) {
          existingImg_1.remove();
        }
        const existingImg_2 = this.resultElement.querySelector(".img_2");
        if (existingImg_2) {
          existingImg_2.remove();
        }
        const img_1 = document.createElement("img");
        const img_2 = document.createElement("img");
        img_1.style.width = "120px";
        img_1.style.height = "120px";
        img_2.style.width = "120px";
        img_2.style.height = "100px";
        img_1.src = isCorrect ? '../img/judge/good_smile.png' : '../img/judge/bad_pose.png';
        img_2.src = isCorrect ? '../img/judge/good_comment1.png' : '../img/judge/bad_comment1.png';

        if (m === 1) {
          result_1.textContent = isCorrect ? '例題 結果 --- 正解' : '例題 結果 --- 不正解';
        } else if (m === 2) {
          result_2.textContent = isCorrect ? '問1. 結果 --- 正解' : '問1. 結果 --- 不正解';
        } else if (m === 3) {
          result_3.textContent = isCorrect ? '問2. 結果 --- 正解' : '問2. 結果 --- 不正解';
        } else if (m === 4) {
          result_4.textContent = isCorrect ? '問3. 結果 --- 正解' : '問3. 結果 --- 不正解';
        } else if (m === 5) {
          result_5.textContent = isCorrect ? '問4. 結果 --- 正解' : '問4. 結果 --- 不正解';
        } else if (m === 6) {
          result_6.textContent = isCorrect ? '問5. 結果 --- 正解' : '問5. 結果 --- 不正解';
        }
        img_1.className = "img_1";
        img_2.className = "img_2";
        this.resultElement.appendChild(img_1);
        this.resultElement.appendChild(img_2);

      }
    }


    const canvas = document.querySelector("Canvas");
    const resultElementId = "result";
    const result_1 = document.getElementById("result_1");
    const result_2 = document.getElementById("result_2");
    const result_3 = document.getElementById("result_3");
    const result_4 = document.getElementById("result_4");
    const result_5 = document.getElementById("result_5");
    const result_6 = document.getElementById("result_6");

    if (typeof canvas.getContext === "undefined") {
      return;
    }
    const game = new Game(canvas, resultElementId);
  }
});

