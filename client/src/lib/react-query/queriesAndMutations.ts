import { forgotPasswordPost, signInPost, verifyCodePost } from '@/apis/auth-api'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import {
  commentForStory,
  createStory,
  deleteCommentOfStory,
  dislikeStory,
  fetchStories,
  deleteStory,
  likeStory,
  getStory,
  bookmarkStory,
} from '@/apis/story-api'
import { followedUser, getProfile, getUsers, updateAvatarPost, updateProfile } from '@/apis/user-api'
import { getMessages, sendMessage } from '@/apis/conversation-api'
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '@/apis/task-api'
import {
  dislikedUser,
  getChats,
  getDatingInfo,
  getLikedUsers,
  getRecommendUsers,
  likedUser,
  updateDatingSetting,
} from '@/apis/dating-api'
import { createCommunity, fetchCommunitiesByUser } from '@/apis/community-api'
import { createIdea,getIdeas } from '@/apis/idea-api'

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: (code: { code?: string }) => verifyCodePost(code),
  })
}
export const useSendCode = () => {
  return useMutation({
    mutationFn: (newPassword: { email: string }) =>
      forgotPasswordPost(newPassword),
  })
}
export const useSignin = () => {
  return useMutation({
    mutationFn: (data: { email?: string; password?: string }) =>
      signInPost(data),
  })
}
export const useFollowedUser = () => {
  return useMutation({
    mutationFn: followedUser,
  })
}

export const useCreateStory = () => {
  return useMutation({
    mutationFn: (values?: FormData) => createStory(values),
  })
}

export const useFetchStories = () => {
  return useInfiniteQuery({
    queryKey: ['stories'],
    queryFn: fetchStories,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined
      }
      return lastPageParam + 10
    },
  })
}

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  })
}

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: updateAvatarPost,
  })
}
export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
  })
}

export const useFetchMessages = (uid) => {
  return useQuery({
    queryKey: ['messages', uid],
    queryFn: () => getMessages(uid),
  })
}

export const useLikeStory = () => {
  return useMutation({
    mutationFn: likeStory,
  })
}
export const useBookmarkStory = () => {
  return useMutation({
    mutationFn: bookmarkStory,
  })
}
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  })
}
export const useDislikeStory = () => {
  return useMutation({
    mutationFn: dislikeStory,
  })
}
export const useCommentForStory = () => {
  return useMutation({
    mutationFn: commentForStory,
  })
}

export const useDeleteCommentOfStory = () => {
  return useMutation({
    mutationFn: deleteCommentOfStory,
  })
}

export const useDeleteStory = () => {
  return useMutation({
    mutationFn: deleteStory,
  })
}

export const useCreateTask = () => {
  return useMutation({
    mutationFn: createTask,
  })
}

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })
}

export const useDeletTask = () => {
  return useMutation({
    mutationFn: deleteTask,
  })
}
export const useUpdateTask = () => {
  return useMutation({
    mutationFn: updateTask,
  })
}

export const useRecommendUsers = () => {
  return useQuery({
    queryKey: ['recommendUsers'],
    queryFn: getRecommendUsers,
  })
}

export const useLikedUser = () => {
  return useMutation({
    mutationFn: likedUser,
  })
}
export const useDislikedUser = () => {
  return useMutation({
    mutationFn: dislikedUser,
  })
}

export const useUpdateDatingSetting = () => {
  return useMutation({
    mutationFn: updateDatingSetting,
  })
}

export const useGetDatingInfo = () => {
  return useQuery({
    queryKey: ['datingInfo'],
    queryFn: getDatingInfo,
  })
}

export const useGetLikedUsers = () => {
  return useQuery({
    queryKey: ['likedUsers'],
    queryFn: getLikedUsers,
  })
}


export const useGetChats = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: getChats,
  })
}


export const useGetStory = (sid) => {
  return useQuery({
    queryKey: ['story', sid],
    queryFn: getStory,
  })
}
export const useGetUserProfile = (uid) => {
  return useQuery({
    queryKey: ['userProfile', uid],
    queryFn: getProfile,
  })
}
export const useGetUserCommunities = (uid) => {
  return useQuery({
    queryKey: ['userCommunities', uid],
    queryFn: fetchCommunitiesByUser,
  })
}

export const useCreateIdea = () => {
  return useMutation({
    mutationFn: createIdea,
  })
}

export const useCreateCommunity = () => {
  return useMutation({
    mutationFn: createCommunity,
  })
}
export const useGetIdeas = () => {
  return useQuery({
    queryKey: ['idea'],
    queryFn: getIdeas,
  })
}
