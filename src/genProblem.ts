import * as fs from 'fs';
import { BoardItemType, BoardType } from './types';

const generateProblem = () => {
  // TODO:コマンドライン引数のエラー処理を追加する

  // ボードの縦横の大きさ
  const height = Number(process.argv[2]);
  const width = Number(process.argv[3]);

  // ボード内の壁('*')の割合
  const wallPercentage = Number(process.argv[4]);

  // テキストデータの出力ファイル名
  const outputFileName = process.argv[5];

  // TODO:ボードの大きさは少なくとも4*3(3*4)以上必要なので、それより小さければエラーを出力する

  let board: BoardType = generateBoard(height, width, wallPercentage / 100);

  const file = fs.createWriteStream(outputFileName);
  file.on('err', (err) => {
    console.error('ファイル出力時にエラーが発生しました:', err);
  });
  board.forEach((v) => {
    file.write(v.join('') + '\n');
  });
  file.end();
};

/**
 * ボードを作成する
 * ボードの外周は壁'*'で埋められており、内部はwallPercentageの値に応じて壁マスと移動可能マスがある
 * ボードの内部にはスタートマスとゴールマスがそれぞれ一つずつ存在する
 * @returns BoardType
 */
const generateBoard = (height: number, width: number, wallPercentage: number): BoardType => {
  const board = Array.from(new Array(height), (_) => new Array(width).fill('*'));
  for (let i = 1; i < height - 1; i++) {
    for (let j = 1; j < width - 1; j++) {
      Math.random() > wallPercentage ? (board[i][j] = ' ') : null;
    }
  }

  // スタートとゴールの座標を生成
  const startX = Math.floor(Math.random() * (width - 2) + 1);
  const startY = Math.floor(Math.random() * (height - 2) + 1);
  let goalX = Math.floor(Math.random() * (width - 2) + 1);
  let goalY = Math.floor(Math.random() * (height - 2) + 1);

  board[startY][startX] = 'S';

  // スタート地点とゴール地点が同じマスなら、ゴール地点の座標を再設定する
  while (startX === goalX && startY === goalY) {
    goalX = Math.floor(Math.random() * (width - 2) + 1);
    goalY = Math.floor(Math.random() * (height - 2) + 1);
  }
  board[goalY][goalX] = 'G';

  return board;
};

generateProblem();
