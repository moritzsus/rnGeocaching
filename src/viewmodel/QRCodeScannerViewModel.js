class QRCodeScannerViewModel {
    static onQRCodeScannedCallback = null;
    static scannedData = null;

    static setOnQRCodeScanned(callback) {
        this.onQRCodeScannedCallback = callback;
      }

    static setScannedData(data) {
        this.scannedData = data;
    }
    
      static notifyQRCodeScanned() {
        if (this.onQRCodeScannedCallback && this.scannedData) {
          this.onQRCodeScannedCallback(this.scannedData);
        }
      }
}

export default QRCodeScannerViewModel;