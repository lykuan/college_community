import { create } from 'zustand'
type TConversation = {
  selectedConversation: Object
  setSelectedConversation: (arg: any) => void
  messages: Array<any>
  setMessages: (arg: any) => void
}
const useConversation = create<TConversation>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}))

export default useConversation
