import axios from "axios";

class ApiController {

  async createLogin(name: string, email: string, password?: string) {
    try {
        
      return await axios.post("https://api-bank-jade.vercel.app/signup", {         //cria dados e retorna token
        name,
        email,
        password
      });

    } catch (error) {
     console.log(error)
    }
  }

  async validLogin (email: string, password: string) {

    try {

      return await axios.post("https://api-bank-jade.vercel.app/signin",{       //faz verification no banco
        email,
        password
      });        
      
    } catch (error) {
    console.log(error)
    }
  }

  async googleValid (email: string) {
    try {

      return await axios.post("https://api-bank-jade.vercel.app/googlesignin",{       //faz verification no banco com login do google
        email
      });      
      
    } catch (error) {
      console.log(error)
    }
  }

  async editValor (id: string, valor: number) {
    try {
     
      const newValor = Number(valor)

      return await axios.patch(`https://api-bank-jade.vercel.app/edit/${id}`,{
        valor: newValor
      });        
      
    } catch (error) {
      console.log(error)
    }
  }

  async myValor(id: string) {
    try {
      
      return await axios.get(`https://api-bank-jade.vercel.app/myvalor/${id}`);        
      
    } catch (error) {
      console.log(error)
    }
  }

  async allUsers(id: string) {
    try {

      return axios.get(`https://api-bank-jade.vercel.app/users/${id}`);
      
    } catch (error) {
      console.log(error)
    }
  }

  async sendValor (id: string, user: string, valor: number) {

    const newValor = Number(valor)

    try {
      
      return axios.patch(`https://api-bank-jade.vercel.app/send/${id}`,{
        user,
        valor: newValor
      });

      
    } catch (error) {
      console.log(error)
    }
  }
  async transaction() {
    try {
      
      return await axios.get(`https://api-bank-jade.vercel.app/transactions`);
      
    } catch (error) {
      console.log(error)
    }
  }
}

export default new ApiController()