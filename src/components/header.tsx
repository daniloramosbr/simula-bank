import Link from "next/link";
import { Tooltip } from "@nextui-org/react";
import {useTheme} from "next-themes";
import { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { ContextJsx } from "@/context/context";

export default function Header() {

  const [isChecked, setIsChecked] = useState((Cookies.get('userTheme') === 'true'))    //inicia com o valor que tem no cookie,se n existir da false

  Cookies.set('userTheme', isChecked === false ? false.toString() : true.toString());    //se isChecked for false, envia false pro cookie, e se for true, true

  const handleCheckboxChange = (e: any) => {                //funçao que muda o valor do checkbox 
    setIsChecked(e.target.checked);
  };

  const [mounted, setMounted] = useState(false)

  const { theme, setTheme } = useTheme()

  const {setMyvalor} = useContext(ContextJsx)

  const userToken: any = Cookies.get('user');     //funcionando logado

  const decode: any = userToken ? jwtDecode(userToken) : null

  useEffect(() => {

    isChecked === true ? setTheme('dark') : setTheme('light')          //verificaçao se eh false ou true pra mudar o tema

    setMounted(true)

  }, [isChecked])

  if(!mounted) return null

  function CleanCookie () {
    setMyvalor(2000)
    Cookies.remove('user')                 //remove o user do cookie ao sair
  }

  return (
    <div className="cont-header dark:bg-dark-bg" id="section1"> 
      <h1>
      <Link href={"/"}><ion-icon name="wallet-outline"></ion-icon> SIMULA BANK</Link>
        
      </h1>
      <div className="cont-link">
        <Link href={"/"}>Home</Link>
        <Link href={"#"}>Sobre Nós</Link>
        <Link href={"#"}>Contate-nos</Link>
      </div>
      <div className="cont-config">
        <Tooltip content="Mudar tema">
          <input type="checkbox"
          checked={isChecked}
        onChange={handleCheckboxChange} 
        className="theme-checkbox"></input>
        </Tooltip>
        <Tooltip content={decode ? decode.name : 'Não logado'}>
        <ion-icon size='large' name="person-circle-outline"></ion-icon>
        </Tooltip>
       {decode &&  <Tooltip content="Sair">
          <Link href={"/"} onClick={CleanCookie}>
          <ion-icon size='large' name="exit-outline"></ion-icon>
          </Link>
        </Tooltip>}
        <div>
    </div>
      </div>
    </div>
  );
}
