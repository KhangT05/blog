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
        <div>
            <div className="pc-header">
                <div className="pc-header__top">
                    <button className="header-btn">
                        <FiAlignJustify className="header-btn__icon" />
                    </button>
                    <h2>{breadcrumb.title}</h2>
                </div>
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
