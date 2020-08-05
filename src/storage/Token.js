import {LocalStorage} from "./LocalStorage.js";

/**
 * アクセストークン
 */
export class Token
{
    /**
     * コンストラクタ
     */
    constructor() {
        this.KEYNAME = "token";
        this._storage = new LocalStorage();
    }

    /**
     * ストレージから取得する。
     *
     * @returns {Promise<*|boolean>}
     */
    async get() {
        return await this._storage.get(this.KEYNAME);
    }

    /**
     * ストレージへセットする。
     *
     * @param token トークン
     * @returns {Promise<*>}
     */
    async set(token) {
        return this._storage.set(this.KEYNAME, token);
    }

    /**
     * ストレージから削除する。
     *
     * @returns {Promise<*>}
     */
    async remove() {
        return this._storage.remove(this.KEYNAME);
    }

    /**
     * トークンの妥当性を検証する。
     *
     * @param token トークン
     * @returns {boolean}
     */
    validate(token) {
        return /^[0-9a-f]{40}$/.test(token);
    }
}