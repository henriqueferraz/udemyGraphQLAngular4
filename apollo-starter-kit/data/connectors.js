import Sequelize from "sequelize";
import casual from "casual";
import _ from "lodash";

const db = new Sequelize("compa_materiais", null, null, {
  dialect: "sqlite",
  storage: "./compras.sqlite"
});

// Tabela Cliente
const ClienteModel = db.define("cliente", {
  nome: { type: Sequelize.STRING }
});

// Tabela Material
const MaterialModel = db.define("material", {
  nome: { type: Sequelize.STRING }
});

// Tabela Compra
const CompraModel = db.define("compra", {
  data: { type: Sequelize.DATE }
});

// Tabela Usuarios
const UserModel = db.define("user", {
  nome: { type: Sequelize.STRING },
  senha: { type: Sequelize.STRING }
});

ClienteModel.hasMany(CompraModel);
MaterialModel.hasMany(CompraModel);

// Cria Randomicamente dados aleatórios no Banco de dados
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return ClienteModel.create({
      nome: casual.name
    }).then(cliente => {
      return MaterialModel.create({
        nome: casual.color_name
      });
    });
  });
  UserModel.create({
    nome: "nome",
    senha: "senha"
  });
});

const Cliente = db.models.cliente;
const Material = db.models.material;
const Compra = db.models.compra;
const User = db.models.user;

export { Cliente, Material, Compra, User };
