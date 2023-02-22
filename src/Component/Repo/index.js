import React from "react";
import RepoList from "./RepoList";
import './style.css';

export default function Repo() {

    return (<>
        <div className="row">
            <div className="col-2">
            </div>
            <div className="col-sm-8 textAlignCenter">
                 <h3 className="">Most Starred Repos</h3>
                <div className=" col-sm-12 justify-content-center"><RepoList /></div>
            </div>
            <div className="col-2"></div>
        </div>
    </>
    )
}