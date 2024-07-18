import { Button } from "@nextui-org/react";
import Header from "@/components/header";
import LoginModal from "@/components/modal/loginModal";
import {User} from "@nextui-org/react";
import Footer from "@/components/footer";
import { Link, animateScroll as scroll } from "react-scroll";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {

  const router = useRouter();
 
  return (
    <main className="cont-home">
      <Header/>
      <div className="cont-start">
        <div className="cont-title">
        <h1>
        SEU BANCO 
        <br/>
        ONLINE
        </h1>
        <p>O unico banco digital feito e criado para agradar você e o seu bolso.</p>
       <div className="start-button">
      <LoginModal/>
       <Button radius='full' className="btn-2 dark:text-white" color="secondary" variant="ghost" onClick={(()=>{
         router.push('/dashboard/guest')
       })}>ENTRAR COMO CONVIDADO</Button>
       </div>
        </div>
        <div className="cont-img">
        <Image  src="cartoon-business.png" alt="cartoon"/>
        </div>
      </div>
      <div className="cont-card dark:bg-dark-bg">
        <div className="card-1 dark:bg-dark-bg">
      <Image src="money.png" alt="money"/>
      <h3>Financeiro</h3>
      <p>cuida do seu financeiro</p>
        </div>
        <div className="card-2 dark:bg-dark-bg">
        <Image src="dart.png" alt="dart"/>
      <h3>Negócios</h3>
      <p>cuida do seus negócios</p>
        </div>
        <div className="card-3 dark:bg-dark-bg">
        <Image src="take-money.png" alt="take"/>
      <h3>Bancos e Serviços</h3>
      <p>bancos e serviços bancários</p>
        </div>
        <div className="card-4 dark:bg-dark-bg">
        <Image src="seg.png" alt="take"/>
      <h3>Seguro</h3>
      <p>criamos seu seguro</p>
        </div>
        <div className="card-5 dark:bg-dark-bg">
        <Image src="world.png" alt="take"/>
      <h3>Investimento e Negociações</h3>
      <p>investimentos para você</p>
        </div>
      </div>
      <div className="cont-client ">
        <h1>
        O que o cliente diz
        </h1>
        <User   
      name="Jane Doe" 
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}/>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident iusto dignissimos nesciunt amet, ipsum iure officia eaque facilis voluptatum, molestias voluptatibus officiis soluta odit.</p>
      </div>
      <Footer/>
      <Link to="section1" smooth={true} duration={800} className="up-btn">
       <ion-icon name="chevron-up-outline"></ion-icon>
    </Link>
    </main>
  )
}
