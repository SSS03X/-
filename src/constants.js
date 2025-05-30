import meatImage from './assets/meat.png';
import cheeseImage from './assets/cheese.png';
import saladImage from './assets/salad.png';
import baconImage from './assets/bacon.png';
import bunTopImage from './assets/bun-top.png';
import bunBottomImage from './assets/bun-bottom.png';


export const BASE_BURGER_PRICE = 30;

export const INGREDIENTS = [
    { id: '1', name: 'Салат', price: 10, type: 'salad' },
    { id: '2', name: 'Бекон', price: 60, type: 'bacon' },
    { id: '3', name: 'Сыр', price: 50, type: 'cheese' },
    { id: '4', name: 'Мясо', price: 80, type: 'meat' }
];

export const BUN_IMAGES = {
    'bread-top': bunTopImage,
    'bread-bottom': bunBottomImage
};

export const INGREDIENT_IMAGES = {
    'meat': meatImage,
    'cheese': cheeseImage,
    'salad': saladImage,
    'bacon': baconImage
};