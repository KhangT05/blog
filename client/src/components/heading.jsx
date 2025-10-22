import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
const Heading = ({ heading, breadcrumb }) => {
    return (
        <div className='mb-5 p-5'>
            <h2 className="uppercase font-semibold"> {heading} </h2>
            <ol className="flex">
                {
                    breadcrumb.map((item, index) =>
                    (
                        <li key={item.title} className="flex items-center gap-2">
                            <Link to={item.path} className="">
                                {item.title}
                            </Link>
                            {index < breadcrumb.length - 1 && (
                                <ChevronRight size={16} />
                            )}
                        </li>
                    ))
                }
            </ol>
        </div>
    );
};

export default Heading;