import {PopupPresenter} from "./PopupPresenter.js";

/**
 * ポップアップ：投稿情報 表示クラス
 */
export class PopupItemInfoPresenter extends PopupPresenter
{
    /**
     * コンストラクタ
     *
     * @param itemInfo 投稿情報
     */
    constructor(itemInfo) {
        super();

        this._title = itemInfo.title;
        this._profileImageUrl = itemInfo.user.profile_image_url;
        this._userId = itemInfo.user.id;
    }

    /**
     * 画面表示する。
     */
    display() {
        this.buildTitleElement();
        this.buildProfileImageElement();
        this.buildAuthorNameElement();

        document.querySelector("#not_qiita").style.display = "none";
        document.querySelector("#item_info").style.display = "block";
    }

    /**
     * タイトルの要素を作成する。
     */
    buildTitleElement() {
        const element = document.querySelector("#item_title");
        element.innerText = this._title;
    }

    /**
     * プロフィール画像の要素を作成する。
     */
    buildProfileImageElement() {
        const element = document.querySelector("#author_image");
        element.src = this._profileImageUrl;
    }

    /**
     * 投稿者名の要素を作成する。
     */
    buildAuthorNameElement() {
        const element = super.buildUserPageLink(this._userId);
        document.querySelector("#author_name").appendChild(element);
    }
}