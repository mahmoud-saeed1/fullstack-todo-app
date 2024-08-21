import { m, LazyMotion, domAnimation } from "framer-motion";
import "../index.css";

type TodoSkeletonProps = {
  count?: number;
};

const TodoSkeleton = ({ count = 5 }: TodoSkeletonProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="todo-skeleton__container">
      <LazyMotion features={domAnimation}>
        {skeletons.map((_, index) => (
          <m.div
            key={index}
            className="todo-skeleton__wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="todo-skeleton__content">
              <m.div
                className="todo-skeleton__line todo-skeleton__line--primary"
                animate={{ width: ["0%", "80%", "60%", "0%"] }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
              <m.div
                className="todo-skeleton__line todo-skeleton__line--secondary"
                animate={{ width: ["0%", "60%", "80%", "0%"] }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.2,
                }}
              />
            </div>

            <div className="todo-skeleton__buttons">
              <m.div
                className="todo-skeleton__button"
                animate={{ scale: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
              <m.div
                className="todo-skeleton__button"
                animate={{ scale: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.2,
                }}
              />
            </div>
          </m.div>
        ))}
      </LazyMotion>
    </div>
  );
};

export default TodoSkeleton;
