export type BoardItemType = '*' | ' ' | 'S' | 'G' | number;

export type BoardType = BoardItemType[][];

export type PointType = {
  x: number;
  y: number;
};

export type PointsType = PointType[];
