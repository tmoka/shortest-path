import * as fs from 'fs';
import { BoardType, PointType } from './types';

const filePath = '../problems/1/problem1.txt';

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('ファイルが読み込めません: ', err);
  }
  const board = data.split('\n').map((array) => array.split('')) as BoardType;
  solver(board);
});

const solver = (board: BoardType) => {
  getStartAndGoal(board);
};

const getStartAndGoal = (board: BoardType): { startPoint: PointType; goalPoint: PointType } => {
  let startPoint: PointType = { x: 0, y: 0 };
  let goalPoint: PointType = { x: 0, y: 0 };
  board.map((elems, i) =>
    elems.map((elem, j) => {
      elem === 'S' ? (startPoint = { x: j, y: i }) : null;
      elem === 'G' ? (goalPoint = { x: j, y: i }) : null;
    }),
  );
  if (startPoint.x === 0 && startPoint.y === 0) {
    console.error('入力データにスタート地点がありません');
  }
  if (goalPoint.x === 0 && goalPoint.y === 0) {
    console.error('入力データにゴール地点がありません');
  }
  return { startPoint, goalPoint };
};
