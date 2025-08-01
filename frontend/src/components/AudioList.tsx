import React, { useEffect, useState } from "react";
import { List, Typography, Button } from "antd";
import { getUserAudio } from "../api/apis";
import { TOKEN_KEY } from "../authentication/AuthProvider";
// import Player from "./Player";

const { Title } = Typography;

const AudioList: React.FC = () => {
  const [audioFiles, setAudioFiles] = useState<Audio[]>([]);
  const [selectedAudio, setSelectedAudio] = useState<Audio | null>(null);

  useEffect(() => {
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

    fetchAudioFiles();
  }, []);

  const handlePlay = (audio: Audio) => {
    setSelectedAudio(audio);
  };

  return (
    <div>
      <Title level={2}>My Audio Files</Title>
      <List
        itemLayout="horizontal"
        dataSource={audioFiles}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<a onClick={() => handlePlay(item)}>{item.title}</a>}
              description={item.description}
            />
            <Button onClick={() => handlePlay(item)}>Play</Button>
          </List.Item>
        )}
      />
      {/* {selectedAudio && <Player audio={selectedAudio} />} */}
      {selectedAudio && <h2>Now Playing: {selectedAudio.title}</h2>}
    </div>
  );
};

export default AudioList;
