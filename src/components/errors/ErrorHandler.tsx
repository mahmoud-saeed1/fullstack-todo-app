import { Link, useLocation } from "react-router-dom";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { IErrorHandler } from "../../interfaces";
import "../../index.css";

const ErrorHandler = ({
  statusCode = 500,
  title = "Server Error",
}: IErrorHandler) => {
  const { pathname } = useLocation();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="error-handler__container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="error-handler__content">
          <m.div
            className="error-handler__icon-wrapper"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
          >
            <div className="error-handler__icon-background">
              <svg
                className="w-16 h-16"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 8H6.01M6 16H6.01M6 12H18C20.2091 12 22 10.2091 22 8C22 5.79086 20.2091 4 18 4H6C3.79086 4 2 5.79086 2 8C2 10.2091 3.79086 12 6 12ZM6 12C3.79086 12 2 13.7909 2 16C2 18.2091 3.79086 20 6 20H14"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M17 16L22 21M22 16L17 21"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </m.div>
          <m.h2
            className="error-handler__title"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            {statusCode} - {title}
          </m.h2>
          <m.p
            className="error-handler__message"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            Oops, something went wrong. Try refreshing this page, or feel free
            to contact us if the problem persists.
          </m.p>
          <div className="error-handler__buttons">
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={"/"}
                className="error-handler__button error-handler__button--home"
                reloadDocument
              >
                Home
              </Link>
            </m.div>
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={pathname}
                className="error-handler__button error-handler__button--refresh"
                reloadDocument
              >
                Refresh
              </Link>
            </m.div>
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default ErrorHandler;
