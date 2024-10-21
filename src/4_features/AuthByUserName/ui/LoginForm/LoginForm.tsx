import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { memo, useCallback } from "react";
import { classNames } from "@/6_shared/lib/classNames/classNames";
import { Button, ThemeButton } from "@/6_shared/ui/Button/Button";
import Input from "@/6_shared/ui/Input/Input";
import Text, { TextTheme } from "@/6_shared/ui/Text/Text";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { DynamicModuleLoader, ReducersList } from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import cls from "./LoginForm.module.scss";
import loginByUsername from "../../model/services/loginByUsername/loginByUserName";

import { loginActions, loginReducer } from "../../model/slice/loginSlice";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === "fulfilled") {
      onSuccess();
    }
  }, [onSuccess, dispatch, password, username]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t("Authorisation Form")} />
        {error && <Text text={error} theme={TextTheme.ERROR} />}
        <Input
          autofocus
          type="text"
          className={cls.input}
          placeholder={t("Username")}
          onChange={onChangeUsername}
          value={username}
        />
        <Input
          type="text"
          className={cls.input}
          placeholder={t("Password")}
          onChange={onChangePassword}
          value={password}
        />
        <Button
          className={cls.loginBtn}
          onClick={onLoginClick}
          theme={ThemeButton.OUTLINE}
          disabled={isLoading}
        >
          {t("Войти")}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
