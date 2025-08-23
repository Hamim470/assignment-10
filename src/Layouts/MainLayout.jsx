import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>

            <main className="pt-20">
                <Outlet></Outlet>
            </main>

            <Footer></Footer>
        </div>
    );
};

export default MainLayout;