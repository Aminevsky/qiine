import {MorePresenter} from "./MorePresenter.js";
import {IsColoringOrganization} from "../storage/IsColoringOrganization.js";

/**
 * More画面：LGTM一覧 表示クラス
 */
export class MoreLgtmListPresenter extends MorePresenter {
    /**
     * コンストラクタ
     *
     * @param lgtms LGTM一覧
     * @param authorOrganization 投稿者の属する組織名
     */
    constructor(lgtms, authorOrganization) {
        super();
        this._lgtms = lgtms;
        this._authorOrganization = authorOrganization;
    }

    /**
     * 画面表示する。
     *
     * @returns {Promise<void>}
     */
    async display() {
        const listElement = document.querySelector("#lgtms");
        const isColoringOrganization = await (new IsColoringOrganization()).get();

        for (const lgtm of this._lgtms) {
            const profileImageElement = this.buildProfileImageElement(lgtm.user.profile_image_url);
            const userIdElement = this.buildUserIdElement(lgtm.user.id);
            const createdDateElement = this.buildCreatedDateElement(lgtm.created_at);

            const lgtmElement = document.createElement("p");
            lgtmElement.appendChild(profileImageElement);
            lgtmElement.appendChild(userIdElement);
            lgtmElement.appendChild(createdDateElement);

            const userOrganization = lgtm.user.organization;
            if (!this.isEmptyOrganization(userOrganization)) {
                const organizationElement = this.buildOrganizationElement(userOrganization);
                lgtmElement.appendChild(organizationElement);

                if (isColoringOrganization && (userOrganization === this._authorOrganization)) {
                    lgtmElement.style.backgroundColor = "#7fffd4";
                }
            }

            listElement.appendChild(lgtmElement);
        }
    }
}