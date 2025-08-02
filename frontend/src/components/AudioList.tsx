import React, { useEffect, useState } from "react";
import { List, Button, Card, message } from "antd";
import { getUserAudio, playAudio } from "../api/apis";
import { TOKEN_KEY } from "../authentication/AuthProvider";
import { AudioInfo } from "../api/types";
import Player from "./Player";

// const { Title } = Typography;

const AudioList: React.FC = () => {
  const [audioFiles, setAudioFiles] = useState<AudioInfo[]>([]);
  const [selectedAudio, setSelectedAudio] = useState<AudioInfo | null>(null);

  const fetchAudioFiles = async () => {
    try {
      // const response = await fetch("/api/audio"); // Adjust the endpoint as necessary
      // const data = await response.json();
      const data = await getUserAudio(localStorage.getItem(TOKEN_KEY) || "");
      setAudioFiles(data);
    } catch (error) {
      console.error("Error fetching audio files:", error);
    }
  };
  useEffect(() => {
    fetchAudioFiles();
  }, []);

  // useEffect(() => {
  //   const loadAudio = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) return;

  //     const result = await playAudio(audioId, token);
  //     setAudio(result);
  //   };

  //   loadAudio();
  // }, [audioId]);

  // const handlePlay = (audio: AudioInfo) => {
  //   setSelectedAudio(audio);
  // };

  const handlePlay = async (audioId: number) => {
    const authToken = localStorage.getItem(TOKEN_KEY); // or however you store it
    if (!authToken) return;

    try {
      const audioSrc = await playAudio(audioId, authToken);
      const audio = new Audio(audioSrc);
      audio.play();
    } catch (err) {
      message.error("Could not play audio");
      console.error(err);
    }
  };

  return (
    <Card title="Audio Files">
      {/* <Title level={2}>Audio Files</Title> */}
      <Button onClick={fetchAudioFiles} style={{ marginBottom: 16 }}>
        Refresh
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={audioFiles}
        renderItem={(audio) => (
          <List.Item>
            <List.Item.Meta
              title={audio.originalname}
              description={audio.description}
            />
            <Button onClick={() => handlePlay(audio.id)}>Play</Button>
          </List.Item>
        )}
      />
      {/* {selectedAudio && <Player audio={selectedAudio} />} */}
      {selectedAudio && <h2>Selected audio: {selectedAudio.originalname}</h2>}
      {/* <audio controls src={audio?.url}>
        Your browser does not support the audio element.
      </audio> */}
    </Card>
  );
};

export default AudioList;
