import Modal from "6_shared/ui/Modal/Modal";
import AcynLoginForm from "../LoginForm/AcyncLoginForm";
import { classNames } from "6_shared/lib/classNames/classNames";
import { Suspense } from "react";
import { Loader } from "6_shared/ui/Loader/Loader";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({
  className,
  isOpen = false,
  onClose,
}: LoginModalProps) => {
  return (
    <Modal
      className={classNames("", {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader />}>
        <AcynLoginForm />
      </Suspense>
    </Modal>
  );
};

export default LoginModal;
