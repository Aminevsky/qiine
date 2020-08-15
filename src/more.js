import {MoreController} from "./controller/MoreController.js";

browser.runtime.onMessage.addListener((request) => {
    const controller = new MoreController();
    controller.init(request.item, request.lgtms, request.lastPageNo);

    document.querySelector("#lgtms").addEventListener("scroll", (event) => {
        const target = event.target;

        // スクロールが最下部に達した際に次のページを表示する。
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            controller.displayNextPage();
        }
    });
});

