/**
 * 表示クラス
 */
export class Presenter
{
    /**
     * ユーザページへのリンクを作成する。
     *
     * @param userId ユーザID
     * @returns {HTMLAnchorElement}
     */
    buildUserPageLink(userId) {
        const userElement = document.createElement("a");
        userElement.href = "https://qiita.com/" + userId;
        userElement.innerText = userId;
        userElement.rel = "noreferrer noopener";
        userElement.target = "_blank";

        return userElement;
    }

    /**
     * 日付を整形する。
     *
     * @param inputDateString 整形対象の文字列
     * @returns {string}
     */
    formatYMD(inputDateString) {
        const obj = new Date(inputDateString);
        const year = obj.getFullYear();
        const month = obj.getMonth() + 1;
        const date = obj.getDate();

        return year + "/" + month + "/" + date;
    }

    /**
     * プロフィール画像の要素を作成する。
     *
     * @param imageUrl 画像URL
     * @returns {HTMLImageElement}
     */
    buildProfileImageElement(imageUrl) {
        const element = document.createElement("img");
        element.src = imageUrl;
        element.width = 16;
        element.height = 16;

        return element;
    }

    /**
     * ユーザIDの要素を作成する。
     *
     * @param userId ユーザID
     * @returns {HTMLAnchorElement}
     */
    buildUserIdElement(userId) {
        return this.buildUserPageLink(userId);
    }

    /**
     * LGTMを追加した日の要素を作成する。
     *
     * @param createdDate 追加日
     * @returns {HTMLSpanElement}
     */
    buildCreatedDateElement(createdDate) {
        const element = document.createElement("span");
        element.className = "created_at";
        element.innerText = this.formatYMD(createdDate);

        return element;
    }

    /**
     * 組織名の要素を作成する。
     *
     * @param organization 組織名
     * @returns {HTMLSpanElement}
     */
    buildOrganizationElement(organization) {
        const element = document.createElement("span");
        element.className = "organization";
        element.innerText = organization;

        return element;
    }

    /**
     * 組織名が空であるかを判定する。
     * 空の場合はtrueを返却し、そうでない場合はfalseを返却する。
     *
     * @param organization
     * @returns {boolean}
     */
    isEmptyOrganization(organization) {
        return organization === "" || organization === null;
    }
}