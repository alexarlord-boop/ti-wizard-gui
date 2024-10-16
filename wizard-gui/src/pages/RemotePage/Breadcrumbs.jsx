// BreadcrumbsComponent.jsx

import Breadcrumbs from "../../components/custom/Breadcrumbs.jsx";

const BreadcrumbsComponent = () => (
    <Breadcrumbs
        itemList={[
            { path: '/', label: 'Home' },
            { path: '/remotes-entities', label: 'Remote Entities' }
        ]}
    />
);

export default BreadcrumbsComponent;