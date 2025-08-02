export interface UserCredentials {
  username: string;
  password: string;
}

export interface AudioInfo {
  id: number;
  filename: string;
  originalname: string;
  description: string;
  category: string;
  createdAt: string;
}

export interface AudioForPlay {
  url: string;
}
