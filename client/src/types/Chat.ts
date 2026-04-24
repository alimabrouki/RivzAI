export type HomeworkCard = {
  id: string;
  title: string;
  text: string;
  messages: Message[];
  timestamp: string
}

export type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  animated?: boolean;
  reaction?: 'like' | 'dislike' | null
}