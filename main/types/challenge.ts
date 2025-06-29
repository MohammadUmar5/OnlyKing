// types/challenge.ts
export interface ChallengeCard {
  id: number;
  title: string;
  subtitle: string;
  image: string; // Emoji icon
  gradient: string[];
  stats: string;
  participants: string;
  timeLeft: string;
  difficulty: string;
  mainTag: string;
  buttonText: string;
  buttonBg: string;
  buttonTextColor: string;
}

export interface ChallengeSubmission {
  id: string;
  challengeId: number;
  challengeTitle: string;
  challengeIcon: string;
  text: string;
  image?: string;
  timestamp: Date;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
}