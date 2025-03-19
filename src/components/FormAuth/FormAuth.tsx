import { FC, useState } from "react";
import "./FormAuth.css";
import { useForm } from 'react-hook-form';
import logo from "../../images/3646420.png"
import { login } from "../../services/redusers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";

export const FormAuth: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error);
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onChange' });
  const [showPass, setShowPass] = useState(false);
  const watchAllFields = watch();
  const disabled = errors !== undefined && Object.keys(errors).length !== 0;
  const buttonSubmitClassName = `form-auth__button_submit ${
    disabled ? 'form-auth__button_submit_disabled' : ''
  }`;
  const formAuthInputClassName = (name: string) => {
    return `form-auth__input ${errors[name]?.message ? 'form-auth__input_err' : ''} ${
      watchAllFields[name]?.length > 0 && errors[name]?.message === undefined
        ? 'form-auth__input_ok'
        : ''
    }`;
  };

  const buttonPassClassName = () => {
    if (watchAllFields !== undefined && watchAllFields.password?.length > 0 && showPass) {
      return 'form-auth__button-pass form-auth__button-pass_hide';
    } else if (watchAllFields !== undefined && watchAllFields.password?.length > 0 && !showPass) {
      return 'form-auth__button-pass form-auth__button-pass_show';
    } else if (watchAllFields !== undefined && watchAllFields.password?.length === 0) {
      return 'form-auth__button-pass';
    } else {
      return 'form-auth__button-pass';
    }
  };


  const handleShowPassword = evt => {
    evt.preventDefault();
    setShowPass(!showPass);
  };
  return (
    <div className="form-auth__container">
      <img src={logo} alt='logo'/>
      <h1 className="form-auth__title">Welcome user!</h1>
      <h2 className="form-auth__subtitle">Please sign in to continue</h2>
      <form
        className="form-auth"
        onSubmit={handleSubmit((values)=> {dispatch(login({login: values.login, password: values.password})); reset()})}
        action="#"
      >
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
        <button
          className={buttonSubmitClassName}
          type="submit"
          disabled={disabled}
        >
          Sign in
        </button>
        <span className="form-auth__err">{error}</span>
      </form>
    </div>
  );
};
