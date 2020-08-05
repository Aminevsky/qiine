import {LocalStorage} from "./LocalStorage.js";

/**
 * 認証済みユーザID
 */
export class AuthUserId
{
    /**
     * コンストラクタ
     */
    constructor() {
        this.KEYNAME = "auth_user_id";
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
     * @param userName ユーザID
     * @returns {Promise<*>}
     */
    async set(userId) {
        return await this._storage.set(this.KEYNAME, userId);
    }

    /**
     * ストレージから削除する。
     *
     * @returns {Promise<*>}
     */
    async remove() {
        return await this._storage.remove(this.KEYNAME);
    }
}