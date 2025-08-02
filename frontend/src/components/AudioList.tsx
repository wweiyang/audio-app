import React, { useEffect, useState } from "react";
import { List, Button, Card, message, Flex, Typography } from "antd";
import { getUserAudio, playAudio } from "../api/apis";
import { SyncOutlined } from "@ant-design/icons";
import { TOKEN_KEY } from "../authentication/AuthProvider";
import { AudioInfo } from "../api/types";

const { Text } = Typography;

const AudioList: React.FC = () => {
  const [audioFiles, setAudioFiles] = useState<AudioInfo[]>([]);
  const [selectedAudio, setSelectedAudio] = useState<AudioInfo | null>(null);
  const [audioSource, setAudioSource] = useState<string | null>(null);

  const fetchAudioFiles = async () => {
    try {
      const data = await getUserAudio(localStorage.getItem(TOKEN_KEY) || "");
      setAudioFiles(data);
    } catch (error) {
      console.error("Error fetching audio files:", error);
    }
  };

  useEffect(() => {
    fetchAudioFiles();
  }, []);

  const handlePlay = async (audio: AudioInfo) => {
    const authToken = localStorage.getItem(TOKEN_KEY);
    if (!authToken) return;

    try {
      const audioSrc = await playAudio(audio.id, authToken);
      if (!audioSrc) {
        console.error("Audio source not found");
        return;
      }
      setAudioSource(audioSrc);
      setSelectedAudio(audio);
    } catch (err) {
      message.error("Could not play audio");
      console.error(err);
    }
  };

  return (
    <Card title="Audio Files">
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Button onClick={fetchAudioFiles}>
          Refresh list <SyncOutlined />
        </Button>
        <Flex align="center" gap={24}>
          {selectedAudio && (
            <Text>
              <b>Selected audio:</b> {selectedAudio.originalname}
            </Text>
          )}
          <audio controls src={audioSource || undefined} />
        </Flex>
      </Flex>
      <List
        itemLayout="horizontal"
        dataSource={audioFiles}
        renderItem={(audio) => (
          <List.Item
            style={{
              backgroundColor:
                audio.id === selectedAudio?.id ? "#e6f7ff" : "white",
              padding: "12px 16px",
            }}
          >
            <List.Item.Meta
              title={audio.originalname}
              description={audio.description}
            />
            <Button onClick={() => handlePlay(audio)}>Select to play</Button>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AudioList;
