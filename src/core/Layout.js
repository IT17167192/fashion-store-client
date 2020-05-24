import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';

const Layout = ({
                    title = 'Title',
                    description = 'Description',
                    className,
                    back = false,
                    backText = '',
                    to = '',
                    children
                }) => (
    <div>
        <div className="card mb-5 p-4" style={{background: '#efefef'}}>
            {
                back ? <div className="row">
                    <div className="col-1 mt-3 ml-2">
                        <Tooltip title={backText} placement="bottom-end">
                            <Link to={to}>
                                <FontAwesomeIcon size={"2x"} icon={faArrowLeft}/>
                            </Link>
                        </Tooltip>
                    </div>
                    <div className="col-10">
                        <h2 className="ml-2">{title}</h2>
                        <p className="lead ml-2">{description}</p>
                    </div>
                </div> : <div>
                    <h2 className="ml-2">{title}</h2>
                    <p className="lead ml-2">{description}</p>
                </div>
            }
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;
