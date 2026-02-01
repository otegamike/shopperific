import "./oops.css";

import oops from "../../assets/shoppers/shopper-oops.png"

interface Props {
    message?: string;
    retry?: () => void
}

const Oops = ({ message , retry }: Props) => {
    return (
        <div className="oops__container">
            <div className="oops">

                <img src={oops} alt="oops" />
                <h1>Oops!</h1>
                <p>{message? message: "Something went wrong"}</p>
                <a onClick={() => {if (retry) retry()}} style={{fontSize: "0.9rem"}}>Try Again</a>
            </div>
        </div>
    )
}

export default Oops