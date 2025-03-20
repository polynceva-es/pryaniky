import { FormEvent, ReactNode } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";


interface LayoutProps  { 
  child: ReactNode,
  buttonTitle: string,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  err: FieldErrors<FieldValues>
}
export const Form = ({ child, buttonTitle, onSubmit, err }: LayoutProps) => {
  const disabled = err !== undefined && Object.keys(err).length !== 0;
  const buttonSubmitClassName = `form-auth__button_submit ${
    disabled ? "form-auth__button_submit_disabled" : ""
  }`;

  return (
    <>
      <form className="form-auth" onSubmit={onSubmit} action="#">
        {child}
        <button
          className={buttonSubmitClassName}
          type="submit"
          disabled={disabled}
        >
          {buttonTitle}
        </button>
      </form>
    </>
  );
};
