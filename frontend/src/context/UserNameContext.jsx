import React from "react";

function UserNameContext({userName}) {
    return (
        <><div style={{display: 'none'}}>{userName}</div>
        </>
    );
}
export default UserNameContext;