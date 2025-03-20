import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  addData,
  deleteData,
  updateData,
} from "../services/redusers/dataSlice";
import { RootState } from "../services/store";
import { dataItem } from "../services/redusers/dataSlice";
import { Modal } from "./Modal/Modal";

export const Table: FC = () => {
  const data = useSelector((state: RootState) => state.data.data);
  const dispatch = useDispatch();
  const token = localStorage.getItem("auth-token");

  const [isModalOpen, setIsModalOpen] = useState(false);

const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
}

const handleDelete = (id: string) => {
    console.log(id);
    dispatch(deleteData({id, token}))
}

const handleAddNewData = (values: dataItem) => {
dispatch(addData(values))
}

  useEffect(() => {
    if (token) dispatch(getData(token));
  }, []);
  return (
    <>
    <table>
        <tbody>
            <tr>
                <th>Дата подписания компанией</th>
                <th>Компания</th>
                <th>Документ</th>
                <th>Статус</th>
                <th>Тип</th>
                <th>Сотрудник</th>
                <th>Дата подписания сотрудником</th>
                <th>Имя сотрудника</th>
                <th>Действия</th>
            </tr>
        {data.map((el) => {
        return (
            <tr key={el.id}>
                <td>{el.companySigDate}</td>
                <td>{el.companySignatureName}</td>
                <td>{el.documentName}</td>
                <td>{el.documentStatus}</td>
                <td>{el.documentType}</td>
                <td>{el.employeeNumber}</td>
                <td>{el.employeeSigDate}</td>
                <td>{el.employeeSignatureName}</td>
                <td>
                    <button onClick={handleOpenModal}>edit</button>
                    <button onClick={()=>handleDelete(el.id)}>delete</button>
                </td>
            </tr>)
        })}
        </tbody>
    </table>
    {isModalOpen ? (<Modal handleOpenModal={handleOpenModal}/>) : <></>}
    </>
  );
};


