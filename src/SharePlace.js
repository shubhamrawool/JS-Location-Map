import { Modal } from "./UI/Modal";
import { Map } from "./UI/Map";
import { getAddressFromCoords, getCoordsFromAddress } from "./Utility/Location";

class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    this.sharedPlaceBtn = document.getElementById("share-btn");

    addressForm.addEventListener("submit", this.findAddressHandler.bind(this));
    this.sharedPlaceBtn.addEventListener("click", this.sharedPlaceHandler.bind(this));
    locateUserBtn.addEventListener("click", this.locateUserHandler.bind(this));
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "Location feature is not enabled, Please update your browser. Alternatively, enter your address manually."
      );
      return;
    }

    const modal = new Modal(
      "loading-modal-content",
      "Getting you location : Please wait!"
    );
    modal.show();

    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        modal.hide();
        const userLocation = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        const address = await getAddressFromCoords(userLocation);
        this.selectPlace(userLocation, address);
      },
      (error) => {
        modal.hide();
        alert(
          "Could not get you location, please enter your address manually."
        );
      }
    );
  }

  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector("input").value;

    if (!address || address.trim() === "") {
      alert("Please enter a valid address");
      return;
    }

    const modal = new Modal(
      "loading-modal-content",
      "Getting you location : Please wait!"
    );

    modal.show();
    
    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (error) {
      alert(error);
    }
    
    modal.hide();
  }

  selectPlace(coordinates, address){
    if(this.map){
      this.map.renderPlace(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.sharedPlaceBtn.disabled = false;
    const sharedLinkEl = document.getElementById("share-link");
    sharedLinkEl.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
  }

  sharedPlaceHandler(){
    const sharedPlaceLinkEl = document.getElementById("share-link");
    if(!navigator.clipboard){
      sharedPlaceLinkEl.select();
    }

    navigator.clipboard.writeText(sharedPlaceLinkEl.value)
    .then(() => {
      alert('Copied to clipboard!');
    })
    .catch(err => {
      console.log(err);
      sharedPlaceLinkEl.select();
    })
  }
}

const placeFinder = new PlaceFinder();
