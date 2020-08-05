import {Token} from "../storage/Token.js";

/**
 * Qiita APIクラス
 */
export class QiitaApi
{
    /**
     * コンストラクタ
     */
    constructor() {
        this._baseUrl = "https://qiita.com";
    }

    /**
     * GETリクエストを実行する。
     *
     * @param apiUrl リクエスト先URL（baseUrlより後ろ）
     * @param apiName API名称（エラーメッセージ用）
     * @returns {Promise<unknown>}
     */
    async executeGetApi(apiUrl, apiName) {
        try {
            let headers = {};
            await this.addAuthorizationHeader(headers);

            const apiResponse = await fetch(this._baseUrl + apiUrl, {
                method: "GET",
                mode: "cors",
                headers: headers
            });

            if (!apiResponse.ok) {
                const errorResponse = await apiResponse.json();
                throw new Error(errorResponse.message);
            }

            const result = await apiResponse.json();
            return Promise.resolve(result);
        } catch (e) {
            throw new Error("Fail to request " + apiName + " API. " + e.message);
        }
    }

    /**
     * Authorizationヘッダを追加する。
     *
     * @param headers ヘッダ
     * @returns {Promise<void>}
     */
    async addAuthorizationHeader(headers) {
        const accessToken = await (new Token()).get();

        if (accessToken) {
            headers.Authorization = "Bearer " + accessToken;
        }
    }
}