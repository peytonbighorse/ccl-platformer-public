import Phaser from "phaser";
import PasswordScene from "./scenes/PasswordScene";
import PreloadScene from "./scenes/PreloadScene";
import TitleScene from "./scenes/TitleScene";
import MainScene from "./scenes/MainScene";
import TransitionScene from "./scenes/TransitionScene";
import Level2Scene from "./scenes/Level2Scene";

const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 512,
  backgroundColor: "#1d1d1d",
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 0 }, debug: false },
  },

  scene: [
    PasswordScene,
    PreloadScene,
    TitleScene,
    MainScene,
    Level2Scene,
    TransitionScene,
  ],
  parent: "app",
  dom: { createContainer: true },
};

export default new Phaser.Game(config);
