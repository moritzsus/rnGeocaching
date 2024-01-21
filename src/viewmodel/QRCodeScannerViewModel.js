import GoogleMapViewModel from "./GoogleMapViewModel";
import GeocacheViewModel from "./GeocacheViewModel";

class QRCodeScannerViewModel {
  static onQRCodeScannedCallback = null;
  static scannedData = null;
  static hideGeocache = true;

  static setOnQRCodeScanned(callback) {
    this.onQRCodeScannedCallback = callback;
  }

  static setScannedData(data) {
    this.scannedData = data;
  }

  static setHideGeoChache(hide) {
    this.hideGeocache = hide;
  }

  static notifyQRCodeScanned() {
    if (this.onQRCodeScannedCallback && this.scannedData) {
      this.onQRCodeScannedCallback(this.scannedData);
    }
  }

  static qrCodeScanned() {
    console.log("DATA IN VM: " + this.scannedData);
    if (this.hideGeocache) {
      currentLocationLat = GoogleMapViewModel.getLocationLat();
      currentLocationLon = GoogleMapViewModel.getLocationLon();

      GeocacheViewModel.hideGeocache(
        this.scannedData,
        currentLocationLat,
        currentLocationLon
      );
      GoogleMapViewModel.notifyGeocacheUpdate();
    } else {
      GeocacheViewModel.findGeocache(this.scannedData);
      GoogleMapViewModel.notifyGeocacheUpdate();
    }
  }
}

export default QRCodeScannerViewModel;
