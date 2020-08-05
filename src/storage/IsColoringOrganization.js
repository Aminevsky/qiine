import {LocalStorage} from "./LocalStorage.js";

/**
 * 組織の色付け設定
 */
export class IsColoringOrganization
{
    /**
     * コンストラクタ
     */
    constructor() {
        this.KEYNAME = "is_coloring_organization";
        this.IS_COLORING_ON = "1";
        this.IS_COLORING_OFF = "2";
        this.IS_COLORING_ORG_DEFAULT = this.IS_COLORING_ON;
        this._storage = new LocalStorage();
    }

    /**
     * ストレージから取得する。
     *
     * @returns {Promise<string|boolean>}
     */
    async get() {
        const value = await this._storage.get(this.KEYNAME);

        // まだキーが無い場合はデフォルト値を設定する。
        if (value === false) {
            await this.set(this.IS_COLORING_ORG_DEFAULT);
            return this.IS_COLORING_ORG_DEFAULT;
        }

        return value === this.IS_COLORING_ON;
    }

    /**
     * ストレージへセットする。
     *
     * @param value 設定値
     * @returns {Promise<void>}
     */
    async set(value) {
        await this._storage.set(this.KEYNAME, value);
    }
}