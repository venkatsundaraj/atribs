import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <main className="w-screen min-h-screen overflow-x-hidden bg-green-800 flex items-center justify-center">
      {children}
    </main>
  );
};

export default layout;
