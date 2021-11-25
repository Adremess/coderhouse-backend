const fs = require("fs");

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(obj) {
    try {
      let exist = await this.exist().then(data => data);
      
      if (exist) {
        let info = await fs.promises.readFile(`./${this.fileName}.txt`, 'utf-8');
        if (info.length > 0) {
          let data = JSON.parse(info);
            obj.id = data[data.length - 1].id + 1;
            data.push(obj);
            console.log(data);
            await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(data, null, 2));
            return obj.id;
          } else {
            console.log('Nuevo elemento creado.');
            let newArray = [];
            obj.id = 1
            newArray.push(obj);
            await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(newArray, null, 2));
            return obj.id;
          }
      } else {
        console.log('Nuevo archivo creado.');
        let newArray = [];
        obj.id = 1
        newArray.push(obj);
        await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(newArray, null, 2));
        return obj.id;
      }
      } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      let info = await fs.promises.readFile(`./${this.fileName}.txt`, 'utf-8');
      if (info.length > 0) {
        let data = JSON.parse(info);
        const Result = data.find(el => el.id === id);
        console.log('Resultado: ' + Result);
        if (Result === undefined) {
          return `Producto de id ${id} no encontrado.`
        } else {
          return Result;
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      return await fs.promises.readFile(`./${this.fileName}.txt`, 'utf-8');
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteById(id) {
    try {
      let info = await fs.promises.readFile(`./${this.fileName}.txt`, 'utf-8');
      if (info.length > 0) {
        let data = JSON.parse(info);
        let exist = await this.idExist(data, id).then(data => data);
        // for(let i = 0; i < data.length; i++) {
        //   if (data[i].id === id) {
        //     data.splice(i, 1);
        //   }
        // }
        if (exist) {
          let filteredArray = data.filter(prod => prod.id != id)
          await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(filteredArray, null, 2));

        } else {
          throw Error (`No existe producto con id ${id}`);
        }
        
        // await fs.promises.writeFile(`./${this.fileName}.txt`, '');
           
        
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAll() {
    try {
      setTimeout(async () => {
        await fs.promises.writeFile(`./${this.fileName}.txt`, '');
      }, 4000);
    } catch (error) {
      throw new Error(error);
    }
  }

  async exist() {
    try {
      let exist = false;
      let files = await fs.promises.readdir('./');
      for (const file of files) {
        if (file === `${this.fileName}.txt`) exist = true;
      }
      return exist;
    } catch (error) {
      throw new Error(error);
    }
  }

  async idExist(items, id) {
    try {
      let exist = false;
      for(let i = 0; i < items.length; i++) {
        if (items[i].id === id) exist = true;
      }
      return exist;
    } catch (error) {
      console.log(error)
    }
  }
};

module.exports = Contenedor;
