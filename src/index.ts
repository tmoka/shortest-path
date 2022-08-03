import * as fs from 'fs';
import { BoardType } from './types';

const filePath = '../problems/1/problem1.txt';

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('ファイルが読み込めません: ', err);
  }
  const board = data.split('\n').map((array) => array.split('')) as BoardType;
  solver();
});

const solver = () => { };
