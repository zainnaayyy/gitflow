import { CssBaseline } from "@mui/material";
import Entry from "./Entry";
import { Provider } from "react-redux";
import { store } from "./app/store";
import CheckStasisChannelStatus from "./services/CheckStasisChannelStatus";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Entry />
      {/* <CheckStasisChannelStatus /> */}
    </Provider>
  );
}

export default App;
