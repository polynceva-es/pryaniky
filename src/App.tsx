import { FormAuth } from "./components/FormAuth/FormAuth";
import { Table } from "./components/Table";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./services/store";

function App() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  return isLogin ? <Table /> : <FormAuth />;
}

export default App;
