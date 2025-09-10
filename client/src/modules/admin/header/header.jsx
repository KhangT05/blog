import { FiAlignJustify } from "react-icons/fi";
import { MdNavigateNext } from "react-icons/md";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Link } from "react-router-dom";

const Heading = ({ breadcrumb }) => {
    return (
        <div className="header">
            <div className="header-top">
                <FiAlignJustify />
                <h2>{breadcrumb.title}</h2>
            </div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link to="/admin">Trang Chủ</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <MdNavigateNext />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <Link to={breadcrumb.route}>{breadcrumb.title}</Link>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default Heading;
