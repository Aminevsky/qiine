import {QiitaGetItemApi} from "../api/QiitaGetItemApi.js";
import {QiitaGetLikesApi} from "../api/QiitaGetLikesApi.js";
import {PopupItemInfoPresenter} from "../presenter/PopupItemInfoPresenter.js";
import {PopupLgtmListPresenter} from "../presenter/PopupLgtmListPresenter.js";
import {AuthUserId} from "../storage/AuthUserId.js";

/**
 * ポップアップ画面のコントローラクラス
 */
export class PopupController
{
    /**
     * コンストラクタ
     */
    constructor() {
        this.PER_PAGE = 100;
        this._isLoading = false;
    }

    /**
     * 初期表示
     *
     * @returns {Promise<void>}
     */
    async init() {
        try {
            this._itemId = await this.fetchItemId();

            // Qiita投稿で無い画面では何もしない
            if (!this.isQiitaItem(this._itemId)) {
                return;
            }

            await this.displayAuthUserId();

            // 読込中マークの表示を開始する。
            this.toggleLoading();

            // 投稿情報を表示する。
            const item = await this.fetchItemInfo(this._itemId);
            this._item = item;
            this.displayItemInfo(item);

            // LGTM一覧を表示する。
            const authorOrganization = item.user.organization;
            const lgtmList = await this.fetchLgtmList(this._itemId, 1);
            this._lgtmList = lgtmList;
            this.displayLgtmList(lgtmList, authorOrganization);

            // 読込中マークの表示を終了する。
            this.toggleLoading();
            this.displayMoreButton();

            this._lastPageNo = this.calcLastPageNo(item.likes_count);
        } catch (e) {
            console.log(e.message);
        }
    }

    /**
     * アクティブタブのURLからQiita投稿のIDを返却する。
     * Qiita投稿でない場合はfalseを返却する。
     *
     * @returns {Promise<boolean|*>}
     */
    async fetchItemId() {
        const pattern = /https:\/\/qiita.com\/.+\/items\/(\w+)/;

        try {
            const tabs = await browser.tabs.query({active: true, currentWindow: true});
            const matches = tabs[0].url.match(pattern);
            const result = matches === null ? false : matches[1];

            return Promise.resolve(result);
        } catch (e) {
            throw new Error('Fail to get tab info.');
        }
    }

    /**
     * Qiita投稿かどうかを判定する。
     *
     * @param itemId
     * @returns {boolean}
     */
    isQiitaItem(itemId) {
        return itemId !== false;
    }

    /**
     * Qiita投稿情報を取得する。
     *
     * @param itemId 投稿ID
     * @returns {Promise<*>}
     */
    async fetchItemInfo(itemId) {
        return (new QiitaGetItemApi()).execute(itemId);
    }

    /**
     * Qiita投稿情報を画面表示する。
     * @param itemInfo 投稿情報
     */
    displayItemInfo(itemInfo) {
        (new PopupItemInfoPresenter(itemInfo)).display();
    }

    /**
     * Qiita LGTM情報を取得する。
     *
     * @param itemId 投稿ID
     * @param pageNo 取得するページ番号
     * @returns {Promise<*>}
     */
    async fetchLgtmList(itemId, pageNo) {
        return (new QiitaGetLikesApi()).execute(itemId, pageNo);
    }

    /**
     * Qiita LGTM情報を画面表示する。
     *
     * @param lgtmList LGTM情報
     * @param authorOrganization 投稿者の所属組織
     */
    displayLgtmList(lgtmList, authorOrganization) {
        (new PopupLgtmListPresenter(lgtmList, authorOrganization)).display();
    }

    /**
     * LGTM数からページ数を算出する。
     * pageの最大値は100なので、算出値が100を上回ったら100として返却する。
     *
     * @param totalLgtm LGTM数
     * @returns {number}
     * @link https://qiita.com/api/v2/docs#%E6%A6%82%E8%A6%81
     */
    calcLastPageNo(totalLgtm) {
        const lastPageNo = Math.ceil(totalLgtm / this.PER_PAGE);

        return lastPageNo <= 100 ? lastPageNo : 100;
    }

    /**
     * 認証済みユーザのIDを表示する。
     *
     * @returns {Promise<void>}
     */
    async displayAuthUserId() {
        const userId = await (new AuthUserId()).get();

        if (userId === false) {
            return;
        }

        const element = document.querySelector("#auth_user_id");
        element.innerText = userId;
    }

    /**
     * Moreボタンを表示する。
     */
    displayMoreButton() {
        document.querySelector("#more_btn").style.display = "block";
    }

    /**
     * Moreページを表示する。
     *
     * @returns {Promise<void>}
     */
    async displayMorePage() {
        browser.tabs.create({
            url: "/page/more/more.html",
            active: false
        }).then(tab => {
            browser.tabs.onUpdated.addListener(() => {
                browser.tabs.sendMessage(tab.id, {
                    item: this._item,
                    lgtms: this._lgtmList,
                    lastPageNo: this._lastPageNo
                }).then(() => {
                    browser.tabs.update(tab.id, {
                        active: true
                    });
                });
            });
        })
    }

    /**
     * 読込中フラグを反転させる。
     * 反転の結果、読込中になった場合はローダーを画面表示する。
     * 非読込中になった場合はローダーを非表示にする。
     */
    toggleLoading() {
        // フラグを反転させる。
        this._isLoading = !(this._isLoading);

        const element = document.querySelector(".loader");

        if (this._isLoading) {
            element.style.display = "block";
            element.style.animationPlayState = "running";
        } else {
            element.style.animationPlayState = "paused";
            element.style.display = "none";
        }
    }
}