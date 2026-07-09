export type Chat = {
  id: number;
  title: string;
  messages: Message[];
  createdAt: Date;
};

export type Message = {
  id: number;
  role: string;
  content: string;
  animated?: boolean;
  reaction?: string | null;
};
