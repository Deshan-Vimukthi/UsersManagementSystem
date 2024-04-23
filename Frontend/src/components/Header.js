import React from "react";
import ReactDOM from 'react-dom/client';
import OnBoarding from "./OnBoarding";
import OnBoardList from "./OnBoardList";

const Header = () =>{

    //navigate to OnBoarding
    const onBoarding = () =>{
        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<OnBoarding/>);
    }

    //navigate to OnBoardList
    const onBoardList = ()=>{
        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<OnBoardList/>);
    }

    return (
        <header className="App-header">
            <div className="header-container">
                <div>

                </div>
                <div/>
                <div className="inner-header-container">
                    <button  className="header-label" onClick={onBoarding}>User OnBoarding</button>
                    <button  className="header-label" onClick={onBoardList}>Users List</button>
                </div>
                <input type="search" placeholder="Search" className="search-text-box"/>
            </div>
        </header>

    )
}

export default Header;