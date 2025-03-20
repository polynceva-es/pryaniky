import { FC } from "react";
import "./Modal.css";
import { Form } from "../Form/Form";
import { RootState } from "../../services/store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export const Modal: FC = ({handleOpenModal}) => {
  const error = useSelector((state: RootState) => state.auth.error);
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const watchAllFields = watch();

  const formAuthInputClassName = (name: string) => {
    return `form-auth__input ${
      errors[name]?.message ? "form-auth__input_err" : ""
    } ${
      watchAllFields[name]?.length > 0 && errors[name]?.message === undefined
        ? "form-auth__input_ok"
        : ""
    }`;
  };
  return (
    <section>
      <button className="modal__btn-close" onClick={()=>handleOpenModal()}>x</button>
      <Form
        child={
          <>
            <label htmlFor="companySigDate" className="form-auth__label">
              Дата подписания компанией
              <input
                className={formAuthInputClassName("companySigDate")}
                id="companySigDate"
                type="text"
                required
                {...register("companySigDate")}
              />
            </label>
            <label htmlFor="companySignatureName" className="form-auth__label">
              Компания
              <input
                className={formAuthInputClassName("companySignatureName")}
                id="companySignatureName"
                type="text"
                required
                {...register("companySignatureName")}
              />
            </label>
            <label htmlFor="documentName" className="form-auth__label">
              Документ
              <input
                className={formAuthInputClassName("documentName")}
                id="documentName"
                type="text"
                required
                {...register("documentName")}
              />
            </label>
            <label htmlFor="documentStatus" className="form-auth__label">
              Статус
              <input
                className={formAuthInputClassName("documentStatus")}
                id="documentStatus"
                type="text"
                required
                {...register("documentStatus")}
              />
            </label>
            <label htmlFor="documentType" className="form-auth__label">
              Тип
              <input
                className={formAuthInputClassName("documentType")}
                id="documentType"
                type="text"
                required
                {...register("documentType")}
              />
            </label>
            <label htmlFor="employeeNumber" className="form-auth__label">
              Сотрудник
              <input
                className={formAuthInputClassName("employeeNumber")}
                id="employeeNumber"
                type="text"
                required
                {...register("employeeNumber")}
              />
            </label>
            <label htmlFor="employeeSigDate" className="form-auth__label">
              Дата подписания сотрудником
              <input
                className={formAuthInputClassName("employeeSigDate")}
                id="employeeSigDate"
                type="text"
                required
                {...register("employeeSigDate")}
              />
            </label>
            <label htmlFor="employeeSignatureName" className="form-auth__label">
              Имя сотрудника
              <input
                className={formAuthInputClassName("employeeSignatureName")}
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
          // dispatch();
          console.log(values)
          reset();
        })}
        err={errors}
      />
      <span>{error}</span>
    </section>
  );
};
