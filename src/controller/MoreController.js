import {MoreItemInfoPresenter} from "../presenter/MoreItemInfoPresenter.js";
import {MoreLgtmListPresenter} from "../presenter/MoreLgtmListPresenter.js";
import {QiitaGetLikesApi} from "../api/QiitaGetLikesApi.js";

/**
 * More画面のコントローラクラス
 */
export class MoreController
{
    /**
     * 初期化
     * @param item 投稿情報
     * @param lgtms LGTM情報
     * @param lastPageNo 最終ページ番号
     */
    init(item, lgtms, lastPageNo) {
        this.displayItemInfo(item);

        this._authorOrganization = item.user.organization;
        this.displayLgtmList(lgtms);

        this._itemId = item.id;
        this._lastPageNo = lastPageNo;
        this._displayPageNo = 1;
        this._isLoading = false;
    }

    /**
     * Qiita投稿情報を画面表示する。
     * @param item 投稿情報
     */
    displayItemInfo(item) {
        const presenter = new MoreItemInfoPresenter(item);
        presenter.display();
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
     * @param lgtms LGTM情報
     */
    displayLgtmList(lgtms) {
        const presenter = new MoreLgtmListPresenter(lgtms, this._authorOrganization);
        presenter.display();
    }

    /**
     * 次のページを表示する。
     *
     * @returns {Promise<void>}
     */
    async displayNextPage() {
        // すでに読込中の場合はそれが終わるまで読み込まない
        if (this._isLoading === true) {
            return;
        }

        if (this._lastPageNo - this._displayPageNo <= 0) {
            return;
        }

        try {
            // 読込中マークの表示を開始する。
            this.toggleLoading();

            // LGTM一覧を表示する。
            const nextPageNo = this._displayPageNo + 1;
            const lgtmList = await this.fetchLgtmList(this._itemId, nextPageNo);
            this.displayLgtmList(lgtmList);

            // 読込中マークの表示を終了する。
            this.toggleLoading();

            this._displayPageNo = nextPageNo;
        } catch (e) {
            console.log(e.message);
        }
    }

    /**
     * 読込中フラグを反転させる。
     * 反転の結果、読込中になった場合はローダーを画面表示する。
     * 非読込中になった場合はローダーを削除する。
     */
    toggleLoading() {
        this._isLoading = !(this._isLoading);

        if (this._isLoading) {
            const loaderElement = document.createElement("div");
            loaderElement.className = "loader";
            loaderElement.style.display = "block";
            loaderElement.style.animationPlayState = "running";
            const lgtmListElement = document.querySelector("#lgtms");
            lgtmListElement.appendChild(loaderElement);
        } else {
            document.querySelector(".loader").remove();
        }
    }
}