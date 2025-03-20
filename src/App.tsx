import { FormAuth } from "./components/FormAuth/FormAuth";
import { Table } from "./components/Table/Table";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./services/store";
import { logOut } from "./services/redusers/authSlice";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  return (
    <>
    {isLogin ? <button className="button" onClick={()=> dispatch(logOut())}>Выйти</button> : <></>}
    {isLogin ? <Table /> : <FormAuth />}
    </>
  )
}

export default App;
