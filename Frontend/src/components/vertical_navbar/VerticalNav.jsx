import "./vertical_nav.css";
import homeIcon from "../../images/home.svg";
import subIcon from "../../images/subscribe.svg";
import matchIcon from "../../images/match.svg";
import resultIcon from "../../images/result.svg";
import VerticalNavIcon from "../vertical_nav_icon/VerticalNavIcon";

const navigates = [
    {
        id: "1",
        name: "Home",
        icon: homeIcon,
        to: "/",
    },
    {
        id: "2",
        name: "Subscribe",
        icon: subIcon,
        to: "/subscribe",
    },
    {
        id: "3",
        name: "Match",
        icon: matchIcon,
        to: "/",
    },
    {
        id: "4",
        name: "Result",
        icon: resultIcon,
        to: "/",
    },
];

function VerticalNav() {

    return (
        <div>
            <nav className="vertical-nav">
                <ul className="navigate">
                    {navigates.map((navigate, index) => {
                        return <VerticalNavIcon navigate={navigate} key={index} />;
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default VerticalNav;