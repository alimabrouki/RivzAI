import { Route, Routes, useNavigate } from "react-router";
import { HomePage } from "./pages/Home/HomePage";
import { HistoryPage } from "./pages/History/HistoryPage";
import { ChatPage } from "./pages/History/ChatPage";
import "./styles/index.css";
import { useLocalStorage } from "../src/hooks/useLocalStorage";
import { useState } from "react";
import TeacherMode from "./pages/teacher-mode/TeacherMode";
import SigninPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import type { Chat, Message } from "./types/Chat";
import ComfirmVerifyEmailPage from "./pages/auth/ComfirmVerifyEmailPage";
import getUserChats from "./api/getUserChats";
import openChat from "./api/openChat";

export const App = () => {
  const openClickedChat = (chatId: number) => {
    navigate(`/history/${chatId}`);
  };

  const [aiIsTyping, setAiIsTyping] = useState(false);

  const navigate = useNavigate();

  const openHistoryCard = (id: string) => navigate(`/history/${id}`);

  const createHistoryItem = (newPrompt: string): HomeworkCard => ({
    id: crypto.randomUUID(),
    title: newPrompt.slice(0, 25),
    text: newPrompt,
    messages: [
      {
        id: crypto.randomUUID(),
        role: "user",
        content: newPrompt,
        animated: true,
        reaction: null,
      },
    ],
    timestamp: new Date().toISOString(),
  });

  const prependHistoryItem = (item: HomeworkCard) =>
    setAddedHistory((prev: HomeworkCard[]) => [item, ...prev]);

  const addHistory = (newPrompt: string) => {
    const card = createHistoryItem(newPrompt);
    prependHistoryItem(card);
    openHistoryCard(card.id);
  };

  const deleteHistoryItem = (deletedCardId: string) => {
    setAddedHistory((prev: HomeworkCard[]) =>
      prev.filter((item) => item.id !== deletedCardId),
    );
    navigate("/history/");
  };

  const handleAiTyping = (state: boolean) => setAiIsTyping(state);

  // const addMessage = (cardId: string, message: Message) => {
  //   setAddedHistory((prev: HomeworkCard[]) =>
  //     prev.map((card) =>
  //       card.id === cardId
  //         ? {
  //             ...card,
  //             messages: [...card.messages, message],
  //           }
  //         : card,
  //     ),
  //   );
  //   setAiIsTyping(false);
  // };

  const markMessageAnimation = (
    cardId: string,
    msgId: string,
    reactionType?: "like" | "dislike" | null,
  ) => {
    setAddedHistory((prev: HomeworkCard[]) =>
      prev.map((card: HomeworkCard) =>
        card.id === cardId
          ? {
              ...card,
              messages: card.messages.map((m: Message) =>
                m.id === msgId
                  ? {
                      ...m,
                      animated: false,
                      reaction:
                        m.reaction === reactionType ? null : reactionType,
                    }
                  : m,
              ),
            }
          : card,
      ),
    );
  };

  return (
    <Routes>
      <Route
        index
        path="/"
        element={<HomePage openClickedChat={openClickedChat} />}
      />
      <Route
        index
        path="/history"
        element={<HistoryPage openClickedChat={openClickedChat} />}
      />
      <Route
        index
        path="/history/:chatId"
        element={
          <ChatPage
            deleteHistoryItem={deleteHistoryItem}
            handleAiTyping={handleAiTyping}
            aiIsTyping={aiIsTyping}
            markMessageAnimation={markMessageAnimation}
            closeChat={() => navigate(-1)}
          />
        }
      />
      <Route index path="/teacher-mode/" element={<TeacherMode />} />
      <Route path="/auth/signin" element={<SigninPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/auth/reset-password/:token"
        element={<ResetPasswordPage />}
      />
      <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
      <Route
        path="/auth/verify-email/:token"
        element={<ComfirmVerifyEmailPage />}
      />
    </Routes>
  );
};

export default App;
