import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("TitleScene");
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2, "Welcome to\n\nCHAOS COUNTY LINE\n\n", {
        fontSize: "32px",
        color: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 140, "Press SPACE to Start", {
        fontSize: "32px",
        color: "#cccccc",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2 + 180, "Press I to Start Infinite Play", {
        fontSize: "32px",
        color: "#cccccc",
      })
      .setOrigin(0.5);

    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.startInfiniteKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.I
    );
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.startKey)) {
      this.scene.start("MainScene", {
        infinite: false,
      });
    }

    if (Phaser.Input.Keyboard.JustDown(this.startInfiniteKey)) {
      this.scene.start("MainScene", {
        infinite: true,
      });
    }
  }
}
