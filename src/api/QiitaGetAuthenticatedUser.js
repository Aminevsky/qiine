import {QiitaApi} from "./QiitaApi.js";

/**
 * 認証済みユーザ情報APIクラス
 */
export class QiitaGetAuthenticatedUser extends QiitaApi
{
    /**
     * コンストラクタ
     */
    constructor() {
        super();
    }

    /**
     * APIを実行する。
     *
     * @returns {Promise<unknown>}
     */
    async execute() {
        const apiUrl = "/api/v2/authenticated_user";
        const apiName = "Authenticated User Get";
        return super.executeGetApi(apiUrl, apiName);
    }
}