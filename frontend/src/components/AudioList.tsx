import React, { useEffect, useState } from "react";
import { List, Button, Card } from "antd";
import { getUserAudio } from "../api/apis";
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

  const handlePlay = (audio: AudioInfo) => {
    setSelectedAudio(audio);
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
              title={
                <a onClick={() => handlePlay(audio)}>{audio.originalname}</a>
              }
              description={audio.description}
            />
            <Button onClick={() => handlePlay(audio)}>Play</Button>
          </List.Item>
        )}
      />
      {/* {selectedAudio && <Player audio={selectedAudio} />} */}
      {selectedAudio && <h2>Selected audio: {selectedAudio.originalname}</h2>}
    </Card>
  );
};

export default AudioList;
