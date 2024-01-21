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
    if (this.hideGeocache) {
      const currentLocationLat = GoogleMapViewModel.getLocationLat();
      const currentLocationLon = GoogleMapViewModel.getLocationLon();
      const currentLocationEle = GoogleMapViewModel.getLocationEle();

      GeocacheViewModel.hideGeocache(
        this.scannedData,
        currentLocationLat,
        currentLocationLon,
        currentLocationEle
      );
      GoogleMapViewModel.notifyGeocacheUpdate();
    } else {
      GeocacheViewModel.findGeocache(this.scannedData);
      GoogleMapViewModel.notifyGeocacheUpdate();
    }
  }
}

export default QRCodeScannerViewModel;
