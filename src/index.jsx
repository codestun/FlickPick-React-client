import { createRoot } from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import { MainView } from "./components/main-view/main-view";
import Container from 'react-bootstrap/Container';
import "./index.scss";

const FlickPickApplication = () => {
  return (
    <Provider store={store} >
      <Container>
        <MainView />
      </Container>
    </Provider>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<FlickPickApplication />);
