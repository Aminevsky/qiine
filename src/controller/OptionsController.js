import {Token} from "../storage/Token.js";
import {AuthUserId} from "../storage/AuthUserId.js";
import {IsColoringOrganization} from "../storage/IsColoringOrganization.js";
import {QiitaGetAuthenticatedUser} from "../api/QiitaGetAuthenticatedUser.js";

/**
 * 設定画面のコントローラクラス
 */
export class OptionsController
{
    /**
     * コンストラクタ
     */
    constructor() {
        this.TOKEN_LENGTH = 40;
    }

    /**
     * 画面表示
     */
    display() {
        this.displayToken();
        this.displayOrganizationCheck();
    }

    /**
     * 設定値「アクセストークン」を表示する。
     */
    displayToken() {
        const addTokenButton = document.querySelector("#add_token_btn");
        addTokenButton.disabled = true;
        const deleteTokenButton = document.querySelector("#delete_token_btn");
        deleteTokenButton.disabled = true;
        const inputToken = document.querySelector("#input_token");
        inputToken.disabled = true;

        const tokenError = document.querySelector("#error_token");
        if (tokenError.innerText.length > 0) {
            tokenError.innerText = "";
        }

        (new Token().get()).then(token => {
            if (token) {
                deleteTokenButton.disabled = false;

                // アスタリスクで伏字にする。
                inputToken.value = "*".repeat(this.TOKEN_LENGTH);
            } else {
                addTokenButton.disabled = false;
                inputToken.disabled = false;
                inputToken.value = "";
            }
        });
    }

    /**
     * トークンを追加する。
     *
     * @returns {Promise<void>}
     */
    async addToken() {
        const token = document.querySelector("#input_token").value;
        const tokenObj = new Token();

        try {
            if (!tokenObj.validate(token)) {
                throw new Error("Token is invalid.");
            }

            await tokenObj.set(token);
            await this.addAuthUserId();
            this.display();
        } catch (e) {
            await tokenObj.remove();
            this.displayTokenError("トークンが適切ではありません。");
            console.log("Fail to add token. " + e.message);
        }
    }

    /**
     * トークンを削除する。
     *
     * @returns {Promise<void>}
     */
    async deleteToken() {
        try {
            await (new Token).remove();
            await (new AuthUserId()).remove();
            this.display();
        } catch (e) {
            console.log("Fail to delete token.")
        }
    }

    /**
     * トークンエラーを画面表示する。
     *
     * @param msg エラーメッセージ
     */
    displayTokenError(msg) {
        const errorElement = document.querySelector("#error_token");
        errorElement.innerText = msg;
        errorElement.style.color = "#ff0000";
    }

    /**
     * トークンに紐づくユーザIDを保存する。
     *
     * @returns {Promise<void>}
     */
    async addAuthUserId() {
        const result = await (new QiitaGetAuthenticatedUser()).execute();
        await (new AuthUserId()).set(result.id);
    }

    /**
     * 設定値「組織」を表示する。
     */
    displayOrganizationCheck() {
        (new IsColoringOrganization()).get().then(optionValue => {
            if (optionValue) {
                document.querySelector("#organization_check").checked = "checked";
            }
        });
    }

    /**
     * 設定値「組織」のチェック状況を保存する。
     *
     * @param isChecked チェック状況
     * @returns {Promise<void>}
     */
    async onChangeIsColoringOrganization(isChecked)
    {
        const storage = new IsColoringOrganization();

        if (isChecked) {
            await storage.set(storage.IS_COLORING_ON);
        } else {
            await storage.set(storage.IS_COLORING_OFF);
        }
    }
}