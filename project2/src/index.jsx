import "bootstrap/dist/css/bootstrap.css";
import "./assets/demo/demo.css";
import "./index.scss";
import "perfect-scrollbar/css/perfect-scrollbar.css";

let render = () => {
    import('./assets/scss/paper-dashboard.scss?v=1.2.0').then(() => {
        require('./AppRenderer');
    });
};
render();
