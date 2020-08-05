import {QiitaApi} from "./QiitaApi.js";

/**
 * LGTM取得APIクラス
 */
export class QiitaGetLikesApi extends QiitaApi
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
     * @param itemId 投稿ID
     * @param page ページ番号
     * @param perPage 1ページあたりの表示件数
     * @returns {Promise<unknown>}
     */
    async execute(itemId, page = 1, perPage = 100) {
        let apiUrl = "/api/v2/items/" + itemId + "/likes";
        apiUrl += "?page=" + page;
        apiUrl += "&per_page=" + perPage;

        const apiName = "LGTM Get";
        return super.executeGetApi(apiUrl, apiName);
    }
}