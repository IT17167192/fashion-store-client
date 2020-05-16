import React from "react";

const Layout = ({
                    title = 'Title',
                    description = 'Description',
                    className,
                    children
                }) => (
    <div>
        <div className="card mb-5 p-4 bg-light">
            <h2 className="ml-2">{title}</h2>
            <p className="lead ml-2">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;
