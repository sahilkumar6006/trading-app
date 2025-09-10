import mongoose from "mongoose";

interface IVideo {
  videoId: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  createdAt: Date;
}

const VideoSchema = new mongoose.Schema<IVideo>({
  videoId: {
    type: String,
    required: true,
    unique: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },

  thumbnail: {
    type: String,
    required: true,
  },
});

const Video = mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
