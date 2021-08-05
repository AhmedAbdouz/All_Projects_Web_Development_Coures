import React from "react";

function Footer(){
    const date =new Date();
    var year =date.getFullYear;
    return <footer className="Footer">
        <p className="Footer-Note"> ⓒ AhmedZ {year} </p>
    </footer>
}

export default Footer;