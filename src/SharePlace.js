import { Modal } from './UI/Modal';

class PlaceFinder {

  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");

    addressForm.addEventListener("submit", this.findAddressHandler);
    locateUserBtn.addEventListener("click", this.locateUserHandler);
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Location feature is not enabled, Please update your browser. Alternatively, enter your address manually."
      );
      return;
    }

    const modal = new Modal('loading-modal-content', 'Getting you location : Please wait!');
    modal.show();
  
    navigator.geolocation.getCurrentPosition(
    successResult => {
        modal.hide();
        const userLocation = {
            lat : successResult.coords.latitude,
            long : successResult.coords.longitude
        };
        console.log(userLocation);
    },
    error => {
        modal.hide();
        alert('Could not get you location, please enter your address manually.');
    })
  }

  findAddressHandler() {}
}

const placeFinder = new PlaceFinder();