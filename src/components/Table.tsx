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
  const token: string | null = localStorage.getItem("auth-token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [element, setElement] = useState(undefined)

  const handleOpenModal = (element: dataItem | undefined): void => {
    setElement(element);
    handleToggleModal();
  }

  const handleToggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  }

  const handleDelete = (id: string) => {
    dispatch(deleteData({id, token}))
  }

  const handleUpdateData = (values: dataItem, id: string) => {
    // console.log(values)
    dispatch(updateData({values, id, token}))
    console.log('update')
  }
  const handleAddNewData = (values: dataItem) => {
    dispatch(addData({values, token}))
    console.log('add new')
  }

  useEffect(() => {
    if (token) dispatch(getData(token));
  }, []);
  return (
    <>
    <button onClick={()=>handleOpenModal(undefined)}>add new</button>
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
                    <button onClick={()=>handleOpenModal(el)}>edit</button>
                    <button onClick={()=>handleDelete(el.id)}>delete</button>
                </td>
            </tr>)
        })}
        </tbody>
    </table>

    {isModalOpen ? (<Modal element={element} handleToggleModal={handleToggleModal} handleUpdateData={handleUpdateData} handleAddNewData={handleAddNewData}/>) : <></>}
    </>
  );
};


