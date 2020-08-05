import {PopupController} from "/src/controller/PopupController.js";

const controller = new PopupController();
controller.init();

document.querySelector("#more_btn").addEventListener("click", () => {
    controller.displayMorePage();
});
