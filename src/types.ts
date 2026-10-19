export type AppTab = 'terminal' | 'visual' | 'code' | 'guide';

export interface HistoryItem {
  id: string;
  timestamp: string;
  operation: string;
  expression: string;
  result: string | number;
  source: 'terminal' | 'visual';
}

export type OperationType =
  | 'plus'
  | 'minus'
  | 'times'
  | 'divided'
  | 'power'
  | 'factorial'
  | 'mod'
  | 'rectangle';

export interface OperationMeta {
  id: OperationType;
  number: number;
  title: string;
  shortDesc: string;
  isHomework?: boolean;
}
