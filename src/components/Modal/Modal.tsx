import "./Modal.css";
import { Form } from "../Form/Form";
import { RootState } from "../../services/store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { dataItem, dataItemWithoutId } from "../../services/redusers/dataSlice";

interface LayoutProps  { 
  element: dataItem | undefined,
  handleToggleModal: () => void,
  handleUpdateData: (values: dataItemWithoutId, id: string) => void,
  handleAddNewData: (values: dataItemWithoutId) => void
}

export const Modal = ({
  element,
  handleToggleModal,
  handleUpdateData,
  handleAddNewData,
}: LayoutProps) => {
  const error = useSelector((state: RootState) => state.auth.error);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange",  defaultValues: {
    companySigDate: element ? new Date(element.companySigDate).toISOString().substring(0, 16) : '',
    companySignatureName: element ? element.companySignatureName : '',
    documentName: element ? element.documentName : '',
    documentStatus: element ? element.documentStatus : '',
    documentType: element ? element.documentType : '',
    employeeNumber: element ? element.employeeNumber : '',
    employeeSigDate: element ? new Date(element.employeeSigDate).toISOString().substring(0, 16) : '',
    employeeSignatureName: element ? element.employeeSignatureName : ''
  },});
  return (
    <section className="modal">
      <button className="button modal__btn-close" onClick={() => handleToggleModal()}></button>
      <Form
        child={
          <>
            <label htmlFor="companySigDate" className="form-auth__label">
              Дата подписания компанией
              <input
                className='form-auth__input'
                id="companySigDate"
                type="datetime-local"
                required
                {...register("companySigDate")}
              />
            </label>
            <label htmlFor="companySignatureName" className="form-auth__label">
              Имя файла подписи компании
              <input
                className='form-auth__input'
                id="companySignatureName"
                type="text"
                required
                {...register("companySignatureName")}
              />
            </label>
            <label htmlFor="documentName" className="form-auth__label">
              Документ
              <input
                className='form-auth__input'
                id="documentName"
                type="text"
                required
                {...register("documentName")}
              />
            </label>
            <label htmlFor="documentStatus" className="form-auth__label">
              Статус
              <input
                className='form-auth__input'
                id="documentStatus"
                type="text"
                required
                {...register("documentStatus")}
              />
            </label>
            <label htmlFor="documentType" className="form-auth__label">
              Тип
              <input
                className='form-auth__input'
                id="documentType"
                type="text"
                required
                {...register("documentType")}
              />
            </label>
            <label htmlFor="employeeNumber" className="form-auth__label">
              Сотрудник
              <input
                className='form-auth__input'
                id="employeeNumber"
                type="text"
                required
                {...register("employeeNumber")}
              />
            </label>
            <label htmlFor="employeeSigDate" className="form-auth__label">
              Дата подписания сотрудником
              <input
                className='form-auth__input'
                id="employeeSigDate"
                type="datetime-local"
                required
                {...register("employeeSigDate")}
              />
            </label>
            <label htmlFor="employeeSignatureName" className="form-auth__label">
              Имя сотрудника
              <input
                className='form-auth__input'
                id="employeeSignatureName"
                type="text"
                required
                {...register("employeeSignatureName")}
              />
            </label>
          </>
        }
        buttonTitle={"Сохранить"}
        onSubmit={handleSubmit((values) => {
          if (element) {
            handleUpdateData({...values}, element.id);
          } else handleAddNewData({...values});
          reset();
          handleToggleModal()
        })}
        err={errors}
      />
      <span>{error}</span>
    </section>
  );
};
