export type Chat = {
  id: string;
  title?: string;
  messages: Message[];
  createdAt: Date;
};

export type Message = {
  id: string;
  role: string;
  content: string;
  animated?: boolean;
  reaction?: string | null;
};
