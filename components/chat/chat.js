import React, { useEffect, useRef } from "react";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import Channel from "./channel";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  setCurrentChat,
  setNewMessage,
} from "../../redux/slices/chat";
import { createChat, sendMessage } from "../../services/firebase";
import { scrollTo } from "../../utils/scrollTo";
import { getMessages } from "../../utils/getMessages";
import { useTranslation } from "react-i18next";

export default function Chat({ windowSize }) {
  const { t: tl } = useTranslation();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const messageEndRef = useRef();
  const { chats, currentChat, newMessage } = useSelector(
    (state) => state.chat,
    shallowEqual
  );
  const user = useSelector((state) => state.user.data, shallowEqual);
  const groupMessages = useSelector(
    (state) => getMessages(state.chat),
    shallowEqual
  );
  const myChat = chats.find((item) => item?.user?.id == user.id);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, currentChat]);
  useEffect(() => {
    if (user && chats) {
      if (myChat) {
        dispatch(setCurrentChat(myChat));
      } else {
        createChat({
          shop_id: -1,
          user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            img: user.img,
          },
        });
      }
    }
  }, [myChat]);
  const handleOnChange = (value) => {
    dispatch(setNewMessage(value));
  };
  const handleOnSubmit = () => {
    const trimmedMessage = newMessage
      .replace(/\&nbsp;/g, "")
      .replace(/<[^>]+>/g, "")
      .trim();
    const payload = {
      chat_content: trimmedMessage,
      chat_id: currentChat?.id,
      sender: 1,
      unread: true,
    };
    if (trimmedMessage) {
      sendMessage(payload);
      dispatch(setNewMessage(""));
      dispatch(addMessage({ ...payload, status: "pending" }));
      const topPosition = messageEndRef.current.offsetTop;
      const container = document.querySelector(
        ".message-list .scrollbar-container"
      );
      scrollTo(container, topPosition - 30, 600);
    }
  };
  return (
    <MainContainer responsive className="chat-container rounded">
      <ChatContainer className="chat-container">
        <MessageList className="message-list">
          <Channel
            groupMessages={groupMessages}
            messageEndRef={messageEndRef}
          />
        </MessageList>
        <MessageInput
          ref={inputRef}
          value={newMessage}
          onChange={handleOnChange}
          onSend={handleOnSubmit}
          placeholder={tl("Message")}
          className="chat-input"
          attachButton={false}
        />
      </ChatContainer>
    </MainContainer>
  );
}
