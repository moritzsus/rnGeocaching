class HideScreenViewModel {
  static qrOpened = false;

  static setQrOpened(opened) {
    console.log("Opened");
    this.qrOpened = opened;
  };
}

export default HideScreenViewModel;
