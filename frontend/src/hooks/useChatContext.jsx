import { useContext } from 'react';

import { ChatContext } from '../contexts/ChatContext';

const useChatContext = () => useContext(ChatContext);

export default useChatContext;
