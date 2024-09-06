import React from "react";
import { motion } from "framer-motion";

import IconContainer from "../components/IconConatainer";
import { CATEGORIES_ICONS, USERDATA } from "../data";
import { Man } from "../icons";

const Home: React.FC = () => {
  return (
    <section>
      <div className="bg-blue-500 w-full h-60 absolute top-0 left-0 rounded-b-[3rem] -z-10" />

      <div className="-translate-y-20 p-6 text-white rounded-b-lg flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold capitalize">{`hello ${USERDATA.username}`}</h1>
          <p>Today you have 25 tasks</p>
        </div>
        <IconContainer>
          <Man />
        </IconContainer>
      </div>

      <div className="h-[35rem] p-6 space-y-4 max-w-2xl mx-auto overflow-x-hidden overflow-y-scroll scrollbar-none">
        {CATEGORIES_ICONS.map((categ) => (
          <motion.div
            key={categ.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x- p-4 bg-white rounded-lg shadow-md"
          >
            <IconContainer>
              <categ.icon />
            </IconContainer>

            <div className="space-y-1">
              <h3 className="text-2xl font-semibold capitalize">
                {categ.label}
              </h3>
              <p className="text-gray-600 text-lg">{categ.label} Tasks</p>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="fixed bottom-6 right-6 bg-blue-500 w-10 h-10 text-white p-4 rounded-full shadow-lg text-xl">
        +
      </button>
    </section>
  );
};

export default Home;
