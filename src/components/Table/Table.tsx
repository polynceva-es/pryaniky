import "./Table.css";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  addData,
  deleteData,
  updateData,
} from "../../services/redusers/dataSlice";
import { RootState, AppDispatch } from "../../services/store";
import { dataItem } from "../../services/redusers/dataSlice";
import { Modal } from "../Modal/Modal";
import { Loader } from "../Loader/Loader";

export const Table: FC = () => {
  const data = useSelector((state: RootState) => state.data.data);
  const isLoading = useSelector((state: RootState) => state.data.isLoading);
  const error = useSelector((state: RootState) => state.data.error);
  const dispatch : AppDispatch = useDispatch();
  const token: string | null = localStorage.getItem("auth-token");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [element, setElement] = useState(undefined);

  const handleOpenModal = (element: dataItem | undefined): void => {
    setElement(element);
    handleToggleModal();
  };

  const handleToggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteData({ id, token }));
  };

  const handleUpdateData = (values: dataItem, id: string) => {
    dispatch(updateData({ values, id, token }));
    console.log("update");
  };
  const handleAddNewData = (values: dataItem) => {
    dispatch(addData({ values, token }));
    console.log("add new");
  };

  useEffect(() => {
    if (token) dispatch(getData(token));
  }, []);
  {
    return !isLoading && data ? (
      <>
        <button className="button" onClick={() => handleOpenModal(undefined)}>
          Добавить новую запись
        </button>
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
              <th></th>
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
                    <button
                      title="Edit"
                      className="button table__btn table__btn_edit"
                      onClick={() => handleOpenModal(el)}
                    ></button>
                    <button
                      title="Delete"
                      className="button table__btn table__btn_delete"
                      onClick={() => handleDelete(el.id)}
                    ></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {error ? <span>{error}</span> : <></>}
        {isModalOpen ? (
          <Modal
            element={element}
            handleToggleModal={handleToggleModal}
            handleUpdateData={handleUpdateData}
            handleAddNewData={handleAddNewData}
          />
        ) : (
          <></>
        )}
      </>
    ) : (
      <Loader />
    )
  }
};
