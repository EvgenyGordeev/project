// Настройка "Холста"
let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    // Получение ширины и высоты элемента canvas 
    let width = canvas.width;
    let height = canvas.height;

    // Вычисление ширины и высоты в ячейках
    let blockSize = 10;
    let widthInBlocks = width / blockSize;
    let heightInBlocks = height / blockSize;

    // Установка начального значения счётчика равного 0 
    let score = 0;

    // Рисование рамки
    let drawBorder = function () {
      ctx.fillStyle = "Gray";
      ctx.fillRect(0, 0, width, blockSize);
      ctx.fillRect(0, height - blockSize, width, blockSize);
      ctx.fillRect(0, 0, blockSize, height);
      ctx.fillRect(width - blockSize, 0, blockSize, height);
    };

    // Вывод счёта игры в левом верхнем углу
    let drawScore = function () {
      ctx.font = "20px Courier";
      ctx.fillStyle = "Black";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText("Score: " + score, blockSize, blockSize);
    };

    // Отмена действия SetInterval и печатание сообщения "Конец игры"
    let gameOver = function () {
      playing = false;
      ctx.font = "60px Courier";
      ctx.fillStyle = "Black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Game Over", width / 2, height / 2);
    };

    // Рисование окружности
    let circle = function (x, y, radius, fillCircle) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      if (fillCircle) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    };

    // Создание конструктора Block (ячейки)
    let Block = function (col, row) {
      this.col = col;
      this.row = row;
    };

    // Рисование квадрата в позиции ячейки
    Block.prototype.drawSquare = function (color) {
      let x = this.col * blockSize;
      let y = this.row * blockSize;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, blockSize, blockSize);
    };

    // Рисование круга в позиции ячейки 
    Block.prototype.drawCircle = function (color) {
      let centerX = this.col * blockSize + blockSize / 2;
      let centerY = this.row * blockSize + blockSize / 2;
      ctx.fillStyle = color;
      circle(centerX, centerY, blockSize / 2, true);
    };

    // Проверка на предмет нахождения этой ячейки в той же позиции, что и ячейка otherBlock
    Block.prototype.equal = function (otherBlock) {
      return this.col === otherBlock.col && this.row === otherBlock.row;
    };

    // Создание Змейки
    let Snake = function () {
      this.segments = [
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
      ];

      this.direction = "right";
      this.nextDirection = "right";
    };

    // Рисование квадрата для каждого сегмента тела Змейки
    Snake.prototype.draw = function () {
      this.segments[0].drawSquare("LimeGreen");
      let isEvenSegment = false;

      for (let i = 1; i < this.segments.length; i++) {
        if (isEvenSegment) {
          this.segments[i].drawSquare("Blue");
        } else {
          this.segments[i].drawSquare("Yellow");
        }

        isEvenSegment = !isEvenSegment; // Next segment will be odd
      }
    };

    // Создание новой головы и добавление её к началу змейки,
    // чтобы передвигать змейку в текущем направлении
    Snake.prototype.move = function () {
      let head = this.segments[0];
      let newHead;

      this.direction = this.nextDirection;

      if (this.direction === "right") {
        newHead = new Block(head.col + 1, head.row);
      } else if (this.direction === "down") {
        newHead = new Block(head.col, head.row + 1);
      } else if (this.direction === "left") {
        newHead = new Block(head.col - 1, head.row);
      } else if (this.direction === "up") {
        newHead = new Block(head.col, head.row - 1);
      }

      if (this.checkCollision(newHead)) {
        gameOver();
        return;
      }

      this.segments.unshift(newHead);

      if (newHead.equal(apple.position)) {
        score++;
        animationTime -= 5;
        apple.move();
      } else {
        this.segments.pop();
      }
    };

    // Проверка на предмет столковения змейки со стеной или собственным телом
    Snake.prototype.checkCollision = function (head) {
      let leftCollision = (head.col === 0);
      let topCollision = (head.row === 0);
      let rightCollision = (head.col === widthInBlocks - 1);
      let bottomCollision = (head.row === heightInBlocks - 1);

      let wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;

      let selfCollision = false;

      for (let i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
          selfCollision = true;
        }
      }

      return wallCollision || selfCollision;
    };

    // Задание нового направления движения змейки на основе нажатой клавиши
    Snake.prototype.setDirection = function (newDirection) {
      if (this.direction === "up" && newDirection === "down") {
        return;
      } else if (this.direction === "right" && newDirection === "left") {
        return;
      } else if (this.direction === "down" && newDirection === "up") {
        return;
      } else if (this.direction === "left" && newDirection === "right") {
        return;
      }

      this.nextDirection = newDirection;
    };

    // Создание конструктора яблока
    let Apple = function () {
      this.position = new Block(10, 10);
    };

    // Рисование круга в позиции яблока
    Apple.prototype.draw = function () {
      this.position.drawCircle("LimeGreen");
    };

    // Перемещение яблока в случайную позицию
    Apple.prototype.move = function () {
      let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
      let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
      this.position = new Block(randomCol, randomRow);
    };

    // Создание объекта - змейки и объекта - яблока
    let snake = new Snake();
    let apple = new Apple();

    let playing = true;
    let animationTime = 100;

    // Создание функции игрового цикла, которая будет вызывать себя, используя setTimeout
    let gameLoop = function () {
      ctx.clearRect(0, 0, width, height);
      drawScore();
      snake.move();
      snake.draw();
      apple.draw();
      drawBorder();

      if (playing) {
        setTimeout(gameLoop, animationTime);
      }
    };

    // Функция запуска игры
    gameLoop();

    // Преобразование кодов клавиш в направления
    let directions = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };

    // Создание обработчика события - клавиши-стрелки
    $("body").keydown(function (event) {
      let newDirection = directions[event.keyCode];
      if (newDirection !== undefined) {
        snake.setDirection(newDirection);
      }
    });