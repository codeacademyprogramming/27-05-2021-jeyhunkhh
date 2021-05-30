import { HttpClient } from "../../httpClient/index";

class CoffeeService extends HttpClient {
    constructor(){
        super('https://isko88.github.io/');
    }

    async getCoffee(){
        return this.get('coffee.json');
    }

    getCoffeeById(id){
       return this.getCoffee().then(res=>{
            return res.data.find(item=>item.id === Number(id))
        })
    }
}

export const coffeeService = new CoffeeService();