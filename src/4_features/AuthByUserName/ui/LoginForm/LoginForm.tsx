import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { classNames } from "@/6_shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/6_shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { ToggleFeatures } from "@/6_shared/lib/features";
import { useAppDispatch } from "@/6_shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useForceUpdate } from "@/6_shared/lib/render/forceUpdate";
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from "@/6_shared/ui/deprecated/Button";
import { Input as InputDeprecated } from "@/6_shared/ui/deprecated/Input";
import TextDeprecated, { TextTheme } from "@/6_shared/ui/deprecated/Text/Text";
import { Button } from "@/6_shared/ui/redesigned/Button/Button";
import { Input } from "@/6_shared/ui/redesigned/Input/Input";
import { VStack } from "@/6_shared/ui/redesigned/Stack";
import { Text } from "@/6_shared/ui/redesigned/Text/Text";

import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import loginByUsername from "../../model/services/loginByUsername/loginByUserName";
import { loginActions, loginReducer } from "../../model/slice/loginSlice";

import cls from "./LoginForm.module.scss";

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
  const forceUpdate = useForceUpdate();

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
      forceUpdate();
    }
  }, [dispatch, username, password, onSuccess, forceUpdate]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <VStack
            gap="16"
            className={classNames(cls.LoginForm, {}, [className])}
          >
            <Text title={t("Форма авторизации")} />
            {error && (
              <Text
                text={t("Вы ввели неверный логин или пароль")}
                variant="error"
              />
            )}
            <Input
              autofocus
              type="text"
              className={cls.input}
              placeholder={t("Введите username")}
              onChange={onChangeUsername}
              value={username}
            />
            <Input
              type="text"
              className={cls.input}
              placeholder={t("Введите пароль")}
              onChange={onChangePassword}
              value={password}
            />
            <Button
              className={cls.loginBtn}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t("Войти")}
            </Button>
          </VStack>
        }
        off={
          <div className={classNames(cls.LoginForm, {}, [className])}>
            <TextDeprecated title={t("Форма авторизации")} />
            {error && (
              <TextDeprecated
                text={t("Вы ввели неверный логин или пароль")}
                theme={TextTheme.ERROR}
              />
            )}
            <InputDeprecated
              autofocus
              type="text"
              className={cls.input}
              placeholder={t("Введите username")}
              onChange={onChangeUsername}
              value={username}
            />
            <InputDeprecated
              type="text"
              className={cls.input}
              placeholder={t("Введите пароль")}
              onChange={onChangePassword}
              value={password}
            />
            <ButtonDeprecated
              theme={ThemeButton.OUTLINE}
              className={cls.loginBtn}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t("Войти")}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  );
});

export default LoginForm;
