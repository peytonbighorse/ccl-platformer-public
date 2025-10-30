export default class PasswordScene extends Phaser.Scene {
  constructor() {
    super("PasswordScene");
  }

  init() {
    this.secretPassword = "sp-Patreon1-630";
    this.userInput = null;
    this.passcodeEntered = false;
  }
  create() {
    const { width, height } = this.scale;

    const passwordForm = this.add.dom(width / 2, height / 2).createFromHTML(`
        <form id="password-form">
      <input
        type="text"
        name="password"
        id="password"
        placeholder="Enter Password"
      />
      <button type="submit">OK</button>
    </form>`);

    this.time.delayedCall(0, () => {
      passwordForm.getChildByID("password").focus();
    });

    passwordForm.addListener("submit");
    passwordForm.on("submit", (event) => {
      event.preventDefault();
      this.userInput = passwordForm.getChildByID("password").value;
    });
  }

  update() {
    if (this.userInput === this.secretPassword && !this.passcodeEntered) {
      this.passcodeEntered = true;
      this.scene.start("PreloadScene");
    }
    if (this.userInput && this.userInput !== this.secretPassword) {
      alert("Incorrect Password, try again!");
      this.userInput = null;
    }
  }
}
