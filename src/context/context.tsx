import { createContext, useState } from "react";

let myVar: any;

export const ContextJsx = createContext(myVar);                //criando  context

type TitleProps = {
  children: any;
}

export const ContextProvider: any = ({ children }: TitleProps) => {

    const [update, setUpdate] = useState({})
    const [myvalor, setMyvalor] = useState<number>(2000)

  return (
    <ContextJsx.Provider value={{ update, setUpdate, myvalor, setMyvalor }}>{children}</ContextJsx.Provider>
  );
};
