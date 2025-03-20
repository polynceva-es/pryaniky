import { FC, useState } from "react";
import "./FormAuth.css";
import { useForm } from "react-hook-form";
import logo from "../../images/3646420.png";
import { login } from "../../services/redusers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { Form } from "../Form/Form";
import { Loader } from "../Loader/Loader";

export const FormAuth: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [showPass, setShowPass] = useState(false);
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

  const buttonPassClassName = () => {
    if (
      watchAllFields !== undefined &&
      watchAllFields.password?.length > 0 &&
      showPass
    ) {
      return "form-auth__button-pass form-auth__button-pass_hide";
    } else if (
      watchAllFields !== undefined &&
      watchAllFields.password?.length > 0 &&
      !showPass
    ) {
      return "form-auth__button-pass form-auth__button-pass_show";
    } else if (
      watchAllFields !== undefined &&
      watchAllFields.password?.length === 0
    ) {
      return "form-auth__button-pass";
    } else {
      return "form-auth__button-pass";
    }
  };

  const handleShowPassword = (evt) => {
    evt.preventDefault();
    setShowPass(!showPass);
  };

  return !isLoading ? (
    <div className="form-auth__container">
      <img src={logo} alt="logo" />
      <h1 className="form-auth__title">Добро пожаловать!</h1>
      <h2 className="form-auth__subtitle">
        Пожалуйста авторизуйтесь, чтобы продолжить
      </h2>
      <Form
        child={
          <>
            <label htmlFor="login" className="form-auth__label">
              Login
              <input
                className={formAuthInputClassName("login")}
                id="login"
                type="text"
                required
                {...register("login")}
              />
            </label>
            <label htmlFor="password" className="form-auth__label">
              Password
              <div className="form-auth__input-container">
                <input
                  className={formAuthInputClassName("password")}
                  id="password"
                  type={showPass ? "text" : "password"}
                  required
                  {...register("password")}
                />
                <button
                  className={buttonPassClassName()}
                  onClick={handleShowPassword}
                />
              </div>
            </label>
          </>
        }
        buttonTitle={"Войти"}
        onSubmit={handleSubmit((values) => {
          dispatch(login({ login: values.login, password: values.password }));
          reset();
        })}
        err={errors}
      />
      <span>{error}</span>
    </div>
  ) : (<Loader/>);
};
