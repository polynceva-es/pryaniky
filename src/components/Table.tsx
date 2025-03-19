import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getData, addData, deleteData, updateData} from "../services/redusers/dataSlice"
import { RootState } from "../services/store"
export const Table: FC = () => {
    const data = useSelector((state: RootState) => state.data.data);
    const dispatch = useDispatch();
    const token = localStorage.getItem("auth-token");
    useEffect(()=> {
        if(token) dispatch(getData(token))
    }, [])
    return (
        <ul>
            {
                data.map((el) => {
                    return (
                        <li key={el.id}>
                            {el.id}
                        </li>
                    )
                })
            }
        </ul>
    )
}