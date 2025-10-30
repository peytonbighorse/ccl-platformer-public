import Phaser from "phaser";

export default class TransitionScene extends Phaser.Scene {
  constructor() {
    super("TransitionScene");
  }
  init(data) {
    this.score = data.score || 0;
    this.progress = data.progress || null;
    this.nextScene = data.nextScene || null;
    this.text = data.text || null;
    this.lives = data.lives || 3;
    this.count = data.count || 0;
    this.infinite = data.infinite || false;
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 - 50, this.text, {
        fontSize: "40px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2, `Score: ${this.score}`, {
        fontSize: "24px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
    if (this.nextScene) {
      this.progressText = this.add
        .text(width / 2, height / 2 + 50, `Press SPACE to ${this.progress}`, {
          fontSize: "24px",
          color: "#cccccc",
        })
        .setOrigin(0.5);

      this.restartKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
    }
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
      if (this.nextScene !== "TitleScene") {
        this.scene.start(this.nextScene, {
          score: this.score,
          lives: this.lives,
          infinite: this.infinite,
          count: this.count,
        });
      }
      if (this.nextScene === "TitleScene") {
        this.scene.start(this.nextScene);
      }
    }
  }
}
