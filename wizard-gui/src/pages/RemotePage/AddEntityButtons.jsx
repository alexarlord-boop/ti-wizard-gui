// AddEntityButtons.jsx

import {Button} from "../../components/ui/button.jsx";
import {isDisabled} from "../../lib/remote_page_utils.js";

const AddEntityButtons = ({ options, handleAddEntityButtonClick }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="add-row">
        <Button disabled={isDisabled('SAML_IDP', options)} onClick={() => handleAddEntityButtonClick('idps')}>+ IDP</Button>
        <Button disabled={isDisabled('SAML_SP', options)} onClick={() => handleAddEntityButtonClick('sps')}>+ SP</Button>
        <Button disabled={isDisabled('OIDC_OP', options)} onClick={() => handleAddEntityButtonClick('ops')}>+ OP</Button>
        <Button disabled={isDisabled('OIDC_RP', options)} onClick={() => handleAddEntityButtonClick('rps')}>+ RP</Button>
    </div>
);

export default AddEntityButtons;