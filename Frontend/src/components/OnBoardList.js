import Header from "./Header";
import ListItem from "./List-Item";

const OnBoardList = () =>{


    return (
        <div>
            <Header/>
            <div className="onboarding-container">
                <h1 className="onboarding-h">User Onboarding</h1>
                <p className="onboarding-h">lorem ipsum dolor sit amet consectetur. Risus commodo faucibus pellentesque habitan.Tincidunt</p>
                <div className="list-header">
                    <div>First Name</div>
                    <div>Last Name</div>
                    <div>Birth of Date</div>
                    <div>Gender</div>
                    <div>Contact Number</div>
                    <div>Email</div>
                </div>
                <ListItem/>
            </div>
        </div>
    );
}

export default OnBoardList;