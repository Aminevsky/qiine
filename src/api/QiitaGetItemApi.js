import { QiitaApi } from "./QiitaApi.js";

/**
 * 投稿情報取得APIクラス
 */
export class QiitaGetItemApi extends QiitaApi
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
     * @returns {Promise<unknown>}
     */
    async execute(itemId) {
        const apiUrl = "/api/v2/items/" + itemId;
        const apiName = "Item Get";
        return super.executeGetApi(apiUrl, apiName);
    }
}