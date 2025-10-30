export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    //logo
    this.load.image("logo", "/assets/logo.png");
    //assets used across levels
    //  player sprite
    this.load.spritesheet("playerSheet", "/assets/player_sheet.png", {
      frameWidth: 128,
      frameHeight: 128,
    });

    //  mouse sprite
    this.load.spritesheet("mouseSheet", "/assets/mouse.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    //  blob sprite
    this.load.spritesheet("blobSheet", "/assets/blob_sheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image("platform", "/assets/platform.png");
    this.load.image("coin", "/assets/coin.png");
    this.load.image("cake", "/assets/cake.png");

    //sfx
    this.load.audio("sfx_jump", "/assets/audio/jump.wav");
    this.load.audio("sfx_coin", "/assets/audio/coin.wav");
    this.load.audio("sfx_hit", "/assets/audio/hit.wav");
    this.load.audio("sfx_death", "/assets/audio/death.wav");
    this.load.audio("sfx_one_up", "/assets/audio/one_up.wav");
    this.load.audio("sfx_power_up", "/assets/audio/power_up.wav");

    //backgrounds
    this.load.image("background1", "/assets/background1.png");
    this.load.image("background2", "/assets/background2.png");

    //songs
    this.load.audio("baby", "/assets/audio/ccl/01_baby.mp3");
    this.load.audio("masquerade", "/assets/audio/ccl/02_masquerade.mp3");
  }

  create() {
    const { width, height } = this.scale;
    this.add
      .text(width / 2, height - 120, "Georgie Porgie Games", {
        color: "#56D52F",
        fontSize: "70px",
        fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
      })
      .setOrigin(0.5);
    this.add.image(width / 2, height / 2 - 50, "logo").setScale(0.6);

    //animate player
    //run
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("playerSheet", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //jump
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("playerSheet", {
        start: 7,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //idle
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("playerSheet", {
        start: 12,
        end: 15,
      }),
      frameRate: 4,
      repeat: -1,
    });

    //death
    this.anims.create({
      key: "death",
      frames: this.anims.generateFrameNumbers("playerSheet", {
        start: 16,
        end: 23,
      }),
      frameRate: 4,
      repeat: 0,
    });

    //animate enemies
    //  blob
    this.anims.create({
      key: "blobRun",
      frames: this.anims.generateFrameNumbers("blobSheet", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //  mouse
    this.anims.create({
      key: "mouseRun",
      frames: this.anims.generateFrameNumbers("mouseSheet", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.time.delayedCall(3000, () => {
      this.scene.start("TitleScene");
    });
  }
}
