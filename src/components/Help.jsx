import React from 'react';
import Accordion from "./Accordion.jsx";
import Email from "./Email.jsx";
const items = [
    {
        title: "Section 1",
        content: "This is the content of section 1"
    },
    {
        title: "Section 2",
        content: "This is the content of section 2"
    },
    {
        title: "Section 3",
        content: "This is the content of section 3"
    }
]

export default function Help() {
    return (
            <div className={"flex mt-10"}>
                <div className={"flex-col ml-10"}>
                <p className={"text-4xl text-black text-center mb-5 font-bold"}>FAQs</p>
                <Accordion items={items}/>
                </div>
                <div className={"flex-col"}>
                <Email/>
                </div>
                {console.log('help')}
            </div>
        )
}