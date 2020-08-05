import {OptionsController} from "/src/controller/OptionsController.js";

const controller = new OptionsController();
controller.display();

document.querySelector("#add_token_btn")
    .addEventListener("click", controller.addToken.bind(controller));

document.querySelector("#delete_token_btn")
    .addEventListener("click", controller.deleteToken.bind(controller));

document.querySelector("#organization_check")
    .addEventListener("change", async (e) => {
        await controller.onChangeIsColoringOrganization(e.target.checked);
    });

