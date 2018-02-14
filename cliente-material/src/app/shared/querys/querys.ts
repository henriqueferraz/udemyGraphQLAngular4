import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';

export const loginQuery: DocumentNode = gql`
query login($nome: string, $senha: string){
  login(nome: $nome, senha: $senha) {nome}
}
`;
