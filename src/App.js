import { Container } from "react-bootstrap";
import "./App.scss";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { Wallpaper } from "./components/Wallpaper/Wallpaper";
import { Weather } from "./components/Weather/Weather";
import { store } from "./app/store";
import { Provider } from "react-redux";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Wallpaper />
        <Container>
          <SearchBar />
          <Weather />
        </Container>
      </Provider>
    </div>
  );
}

export default App;
