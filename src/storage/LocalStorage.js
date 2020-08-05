/**
 * ローカルストレージ クラス
 */
export class LocalStorage
{
    /**
     * コンストラクタ
     */
    constructor() {
        this._storage = browser.storage.local;
    }

    /**
     * ストレージから取得する。
     * キーが存在しない場合はfalseを返却する。
     *
     * @param key 取得キー
     * @returns {Promise<boolean|*>}
     */
    async get(key) {
        const item = await this._storage.get(key);

        if (item.hasOwnProperty(key)) {
            return item[key];
        }

        return false;
    }

    /**
     * ストレージへセットする。
     *
     * @param key キー
     * @param value バリュー
     * @returns {Promise<*>}
     */
    async set(key, value) {
        const params = {};
        params[key] = value;

        return this._storage.set(params);
    }

    /**
     * ストレージから削除する。
     *
     * @param key キー
     * @returns {Promise<*>}
     */
    async remove(key) {
        return this._storage.remove(key);
    }
}