
export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  grade: string;
  image: string;
  description: string;
}

export enum Category {
  ALFABETIZACAO = 'Alfabetização',
  MATEMATICA_LUDICA = 'Matemática Lúdica',
  GRATUITOS = 'Gratuitos',
  SEQUENCIA_DIDATICA = 'Sequência Didática'
}

export enum Grade {
  INFANTIL = 'Educação Infantil',
  FUNDAMENTAL_1 = 'Fundamental I',
  FUNDAMENTAL_2 = 'Fundamental II',
  ESPECIAL = 'Educação Especial'
}

export type AppView = 'home' | 'cart' | 'account' | 'admin';
