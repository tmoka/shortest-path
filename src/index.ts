import * as fs from 'fs';
import { BoardItemType, BoardType, PointsType, PointType } from './types';

const filePath = process.argv[2];

if (!filePath) {
  console.error('解く問題を指定してください');
}

fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('ファイルが読み込めません: ', err);
  }
  const board = data.split('\n').map((array) => array.split('')) as BoardType;
  solver(board);
});

const solver = (board: BoardType) => {
  const { startPoint, goalPoint } = getStartAndGoal(board);
  const nextPoints: PointsType = [startPoint];
  board[startPoint.y][startPoint.x] = 0;
  let dist = 0;

  search(board, nextPoints, dist);
  console.log(board);
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

const search = (board: BoardType, nextPoints: PointsType, dist: number) => {
  let nextSearchPoints: PointsType = [];
  dist = 1;
  while (nextPoints.length) {
    const searchPoint = { x: nextPoints[0].x, y: nextPoints[0].y };
    // 左を探索
    if (judge(board[searchPoint.y][searchPoint.x - 1])) {
      nextSearchPoints.push({ x: searchPoint.x - 1, y: searchPoint.y });
      board[searchPoint.y][searchPoint.x - 1] = dist;
    }
    // 右を探索
    if (judge(board[searchPoint.y][searchPoint.x + 1])) {
      nextSearchPoints.push({ x: searchPoint.x + 1, y: searchPoint.y });
      board[searchPoint.y][searchPoint.x + 1] = dist;
    }
    // 上を探索
    if (judge(board[searchPoint.y - 1][searchPoint.x])) {
      nextSearchPoints.push({ x: searchPoint.x, y: searchPoint.y - 1 });
      board[searchPoint.y - 1][searchPoint.x] = dist;
    }
    // 下を探索
    if (judge(board[searchPoint.y + 1][searchPoint.x])) {
      nextSearchPoints.push({ x: searchPoint.x, y: searchPoint.y + 1 });
      board[searchPoint.y + 1][searchPoint.x] = dist;
    }
    nextPoints.shift();

    if (!nextPoints.length) {
      dist++;
      nextPoints = [...nextSearchPoints];
      nextSearchPoints = [];
    }
  }
};

const judge = (boardItem: BoardItemType) => {
  if (boardItem === ' ') {
    return true;
  } else if (boardItem === 'G') {
    console.log('GOAL!!!!!!');
    return;
  }
  {
    return false;
  }
};
