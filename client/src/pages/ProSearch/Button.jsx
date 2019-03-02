import React from 'react';

function Button({className="", ...props}) {
    // console.log(props)
    let classNames = ["btn", className].join(" ");
    return <button onClick={props.onClick} className={classNames} {...props}/>;
}

export default Button;