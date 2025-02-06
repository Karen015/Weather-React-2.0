import { Button, Image } from "antd"
import { Link } from "react-router-dom"
import "./index.css"

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to={"/"}>
                <Image src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png" preview={false} width={120} height={50}/>
            </Link>
            <Link to={"preferences"}>
                <Button>
                    preferences
                </Button>
            </Link>
            
        </div>
    )
}

export default Navbar