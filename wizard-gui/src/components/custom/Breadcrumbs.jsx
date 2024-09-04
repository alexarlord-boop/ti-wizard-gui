import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "../ui/breadcrumb.jsx";
import {Fragment} from "react";

export default function Breadcrumbs({ itemList = [] }) {
    const initList = [
        {
            path: '/',
            label: 'Home',
        }
    ];

    let currentList = [...initList, ...itemList];

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    currentList.map((item, index) => (
                        <Fragment key={index}>
                            <BreadcrumbItem>
                                {
                                    index === currentList.length - 1 ?
                                        <BreadcrumbPage>{item.label}</BreadcrumbPage> :
                                        <BreadcrumbLink href={item.path}>{item.label}</BreadcrumbLink>
                                }
                            </BreadcrumbItem>
                            {index < currentList.length - 1 && <BreadcrumbSeparator />}
                        </Fragment>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    );
}
