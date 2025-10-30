import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.roundActive = false;
  }

  init(data) {
    this.infinite = data.infinite || false;
    this.timeLeft = 228; //228
  }

  create() {
    //game over
    this.gameOver = false;
    this.paused = false;

    //coin to life tracker
    this.count = 0;

    //background music
    this.music = this.sound.add("baby", { loop: true, volume: 1 });
    this.music.play();

    //sfx
    this.muted = false;
    this.sfxJump = this.sound.add("sfx_jump", { volume: 0.3 });
    this.sfxCoin = this.sound.add("sfx_coin", { volume: 0.3 });
    this.sfxHit = this.sound.add("sfx_hit", { volume: 0.3 });
    this.sfxOneUp = this.sound.add("sfx_one_up", { volume: 0.7 });
    this.sfxDeath = this.sound.add("sfx_death", { volume: 0.5 });

    //adds background
    this.background = this.add.image(0, 0, "background1").setOrigin(0, 0);

    //countdown & lives
    if (!this.infinite) {
      this.lives = 3;
      this.livesText = this.add
        .text(786, 16, `Lives: 3`, {
          fontSize: "20px",
          color: "#ffffff",
        })
        .setScrollFactor(0);
    }

    this.countdownText = this.add
      .text(16, 36, `Time: ${this.timeLeft}`, {
        fontSize: "20px",
        color: "#ffffff",
      })
      .setScrollFactor(0);

    //score initialization
    this.score = 0;
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "20px",
      color: "#ffffff",
    });
    this.scoreText.setScrollFactor(0);
    this.scoreText.setDepth(999);

    this.cake = this.physics.add
      .sprite(893, 220, "cake")
      .setScale(0.5)
      .refreshBody();

    //adds player
    this.player = this.physics.add.sprite(100, 300, "playerSheet", 12);
    this.player.setScale(0.3).refreshBody();
    this.player.setSize(30, 100);
    this.player.setCollideWorldBounds(true);
    this.playerGravity = 700;
    this.player.body.setGravityY(this.playerGravity);
    this.playerSpeed = 200;
    this.playerJumpSpeed = -400;

    this.physics.add.overlap(this.player, this.cake, this.eatCake, null, this);

    //add blob enemy 1

    this.blob1 = this.physics.add
      .sprite(600, 410, "blobSheet", 0)
      .setTint(0xff5555);
    this.blob1.setSize(29, 15).setOffset(5, 17);
    this.blob1.setCollideWorldBounds(true);

    this.blob1.body.setGravityY(600);

    //set enemy patrol
    this.blob1MinX = 40; //left side bounds
    this.blob1MaxX = 662; //right side bounds
    this.enemySpeed = 100;

    this.blob1.setVelocityX(this.enemySpeed);

    this.physics.add.collider(
      this.player,
      this.blob1,
      this.onPlayerHitEnemy,
      null,
      this
    );

    //enemy 2
    //add enemy
    this.blob2 = this.physics.add
      .sprite(1400, 410, "blobSheet", 0)
      .setTint(0xff5555);
    this.blob2.setSize(29, 15).setOffset(5, 17);
    this.blob2.setCollideWorldBounds(true);

    this.blob2.body.setGravityY(600);

    //set enemy patrol
    this.blob2MinX = 662; //left side bounds
    this.blob2MaxX = 1280; //right side bounds

    this.blob2.setVelocityX(this.enemySpeed * 2);

    this.physics.add.collider(
      this.player,
      this.blob2,
      this.onPlayerHitEnemy,
      null,
      this
    );

    //enemy 3

    //add mouse enemy
    this.mouse = this.physics.add
      .sprite(900, 250, "mouseSheet", 0)
      .setTint(0xff5555)
      .refreshBody();
    this.mouse.setSize(29, 15).setOffset(5, 17);
    this.mouse.setCollideWorldBounds(true);

    this.mouse.body.setGravityY(600);

    //set enemy patrol
    this.mouseMinX = 700; //left side bounds
    this.mouseMaxX = 1080; //right side bounds

    this.mouse.setVelocityX(this.enemySpeed * 2);

    this.physics.add.collider(
      this.player,
      this.mouse,
      this.onPlayerHitEnemy,
      null,
      this
    );

    this.platformX = 320;
    this.platformY = 390;

    //platform 1 - shoe shelf
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(this.platformX, this.platformY, "platform")
      .setAlpha(0)
      .setScale(0.55, 0.25)
      .refreshBody();

    //chair 1
    this.platforms
      .create(this.platformX + 362, this.platformY - 1, "platform")
      .setAlpha(0)
      .setScale(0.35, 0.05)
      .refreshBody();

    this.platforms
      .create(this.platformX + 357, this.platformY - 70, "platform")
      .setAlpha(0)
      .setScale(0.33, 0.05)
      .refreshBody();

    this.platforms
      .create(this.platformX + 300, this.platformY - 140, "platform")
      .setAlpha(0)
      .setScale(0.04, 1)
      .refreshBody();

    //table
    this.platforms
      .create(this.platformX + 570, this.platformY - 120, "platform")
      .setAlpha(0)
      .setScale(1.5, 0.05)
      .refreshBody();

    //chair 2
    this.platforms
      .create(this.platformX + 780, this.platformY - 1, "platform")
      .setAlpha(0)
      .setScale(0.42, 0.05)
      .refreshBody();

    this.platforms
      .create(this.platformX + 780, this.platformY - 70, "platform")
      .setAlpha(0)
      .setScale(0.33, 0.05)
      .refreshBody();

    this.platforms
      .create(this.platformX + 845, this.platformY - 152, "platform")
      .setAlpha(0)
      .setScale(0.02, 0.8)
      .refreshBody();

    //floor
    this.platforms
      .create(0, 465, "platform")
      .setAlpha(0)
      .setScale(10, 0.25)
      .refreshBody();
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.blob1, this.platforms);
    this.physics.add.collider(this.blob2, this.platforms);
    this.physics.add.collider(this.mouse, this.platforms);

    //coins
    this.coins = this.physics.add.group({
      allowGravity: true,
      collideWorldBounds: false,
    });

    //overlaps
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      null,
      this
    );

    //spawn coins
    this.spawnCoins = (n) => {
      for (let i = 0; i < n; i++) {
        const x = Phaser.Math.Between(20, 1310);
        const y = Phaser.Math.Between(0, 452);
        let c = this.coins.get(x, y, "coin");
        if (!c) (c = this.coins), create(x, y, "coin");

        c.enableBody(true, x, y, true, true);
        c.setActive(true).setVisible(true);
        c.setScale(0.35);
        c.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
        c.setGravityY(500);
      }
    };

    this.coinEvent = this.time.addEvent({
      delay: 0,
      loop: false,
      callback: () => {
        if (!this.roundActive) return;
        this.spawnCoins(Phaser.Math.Between(10, 20));
      },
    });

    this.coinEvent = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (!this.roundActive) return;
        this.spawnCoins(Phaser.Math.Between(1, 3));
      },
    });
    this.physics.add.collider(this.coins, this.platforms);
    //start round
    this.roundActive = true;

    //Timer
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (!this.roundActive) return;
        this.timeLeft--;
        this.countdownText.setText(`Time: ${this.timeLeft}`);
        if (this.timeLeft <= 0) {
          this.nextLevel(true);
        }
      },
    });

    //keyboard control
    this.cursors = this.input.keyboard.createCursorKeys();
    this.muteKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.pauseKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.P
    );
    this.quitKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    this.physics.world.setBounds(0, 0, 1324, 512);
    this.cameras.main.setBounds(0, 0, 1324, 512);

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
  }

  update() {
    if (this.gameOver) return;

    this.player.setVelocityX(0);

    //pause
    if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
      if (!this.paused) {
        this.physics.world.pause();
        this.paused = true;
        this.timerEvent.paused = true;
        this.music.pause();
        this.coinEvent.paused = true;
      } else if (this.paused) {
        this.physics.world.resume();
        this.paused = false;
        this.timerEvent.paused = false;
        this.music.resume();
        this.coinEvent.paused = false;
      }
    }

    //quit
    if (Phaser.Input.Keyboard.JustDown(this.quitKey)) {
      if (this.music && this.music.isPlaying) this.music.stop();
      this.scene.start("TransitionScene", {
        score: this.score,
        progress: "Start Over",
        nextScene: "TitleScene",
        text: "GAME OVER",
      });
    }
    //mute
    if (Phaser.Input.Keyboard.JustDown(this.muteKey)) {
      if (!this.muted) {
        this.sfxCoin.volume = 0;
        this.sfxDeath.volume = 0;
        this.sfxHit.volume = 0;
        this.sfxJump.volume = 0;
        this.sfxOneUp.volume = 0;
        this.muted = true;
      } else if (this.muted) {
        this.sfxCoin.volume = 0.3;
        this.sfxDeath.volume = 0.5;
        this.sfxHit.volume = 0.3;
        this.sfxJump.volume = 0.3;
        this.sfxOneUp.volume = 0.5;
        this.muted = false;
      }
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
      this.player.setFlipX(false);
    }

    const onGround =
      this.player.body.blocked.down || this.player.body.touching.down;
    if (this.cursors.up.isDown && onGround) {
      this.sfxJump.play();
      this.player.setVelocityY(this.playerJumpSpeed);
    }

    //animation
    const vx = this.player.body.velocity.x;
    const vy = this.player.body.velocity.y;

    if (!onGround) {
      if (this.player.anims.currentAnim?.key !== "jump")
        this.player.play("jump", true);
    } else if (Math.abs(vx) > 5) {
      if (this.player.anims.currentAnim?.key !== "run")
        this.player.play("run", true);
    } else {
      if (this.player.body.velocity.x === 0) {
        this.player.play("idle", true);
      }
    }

    if (this.blob1.x <= this.blob1MinX) {
      this.blob1.setVelocityX(this.enemySpeed);
      this.blob1.setFlipX(true);
      this.blob1.play("blobRun", true);
    } else if (this.blob1.x >= this.blob1MaxX) {
      this.blob1.setVelocityX(-this.enemySpeed);
      this.blob1.setFlipX(false);
      this.blob1.play("blobRun", true);
    }

    if (this.blob2.x <= this.blob2MinX) {
      this.blob2.setVelocityX(this.enemySpeed * 2.5);
      this.blob2.setFlipX(true);
      this.blob2.play("blobRun", true);
    } else if (this.blob2.x >= this.blob2MaxX) {
      this.blob2.setVelocityX(-this.enemySpeed * 2.5);
      this.blob2.setFlipX(false);
      this.blob2.play("blobRun", true);
    }

    if (this.mouse.x <= this.mouseMinX) {
      this.mouse.setVelocityX(this.enemySpeed * 1.5);
      this.mouse.setFlipX(false);
      this.mouse.play("mouseRun", true);
    } else if (this.mouse.x >= this.mouseMaxX) {
      this.mouse.setVelocityX(-this.enemySpeed * 1.5);
      this.mouse.setFlipX(true);
      this.mouse.play("mouseRun", true);
    }
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true); //removes coin

    //set score
    this.score += 1;
    this.count += 1;
    this.scoreText.setText(`Score: ${this.score}`);

    if (!this.infinite) {
      if (this.count === 200) {
        this.lives += 1;
        this.livesText.setText(`Lives: ${this.lives}`);
        this.count = 0;
        this.sfxOneUp.play();
      }
    }

    this.playerSpeed += 0.5;
    this.enemySpeed += 0.25;
    this.sfxCoin.play();

    this.tweens.add({
      targets: this.scoreText,
      scale: 1.15,
      yoyo: true,
      duration: 120,
      ease: "Quad.easeOut",
    });
  }
  eatCake(player, cake) {
    cake.disableBody(true, true);
    if (!this.infinite) {
      this.lives += 1;
      this.livesText.setText(`Lives: ${this.lives}`);
    }
    if (this.infinite) {
      this.score += 100;
      this.scoreText.setText(`Score: ${this.score}`);
    }

    this.sfxOneUp.play();
  }
  nextLevel(success) {
    this.roundActive = false;
    this.physics.world.pause();
    this.timerEvent?.remove?.();
    if (this.music && this.music.isPlaying) this.music.stop();
    this.scene.start("TransitionScene", {
      score: this.score,
      progress: "Continue",
      nextScene: "Level2Scene",
      text: "SUCCESS",
      lives: this.lives || 0,
      count: this.count,
      infinite: this.infinite,
    });
  }
  resetPlayer(player, enemy) {
    this.sfxHit.play();
    this.cameras.main.flash(250);
    this.cameras.main.shake(250, 0.01);
    this.physics.world.pause();
    this.coinEvent.paused = true;

    player.setVelocity(0, 0);
    enemy.setVelocity(0, 0);
    this.time.delayedCall(3000, () => {
      this.physics.resume();
      enemy.setVelocityX(this.enemySpeed);
      this.coinEvent.paused = false;
      player.setPosition(100, 20);
    });
  }
  onPlayerHitEnemy(player, enemy) {
    if (!this.infinite) {
      if (this.gameOver) return;

      this.lives -= 1;
      this.livesText.setText(`Lives: ${this.lives}`);

      if (this.lives > 0) {
        this.resetPlayer(player, enemy);
      }

      if (this.lives <= 0) {
        this.gameOver = true;

        //Feedback
        player.play("death", true);
        this.sfxDeath.play();
        this.cameras.main.flash(250);
        this.cameras.main.shake(250, 0.01);
        this.physics.world.pause();
        player.setVelocity(0, 0);
        enemy.setVelocity(0, 0);
        this.timeLeft = 228;
        this.roundActive = false;

        this.time.delayedCall(2000, () => {
          if (this.music && this.music.isPlaying) this.music.stop();
          this.scene.start("TransitionScene", {
            score: this.score,
            progress: "Start Over",
            nextScene: "TitleScene",
            text: "GAME OVER",
          });
        });
      }
    }
    if (this.infinite) {
      this.resetPlayer(player, enemy);
    }
  }
}
