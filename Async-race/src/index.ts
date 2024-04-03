import FooterComponent from "./components/pagesComponents/footerComponent";
import HeaderComponent from "./components/pagesComponents/headerComponent";
import "./index.css";
import Router from "./router ";

const main = document.createElement("main");
const header = document.createElement("header");
header.innerHTML = HeaderComponent();
const footer = document.createElement("footer");
footer.innerHTML = FooterComponent();
document.body.append(header, main, footer);
const root = document.createElement("div");
root.id = "root";
main.append(root);
const router = new Router(root);
router.init();
