import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { uploadAudio } from "../api/apis";
import { TOKEN_KEY } from "../authentication/AuthProvider";
import { AUDIO_CATEGORIES } from "../constants";

const AudioUploadForm: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleUploadChange = (info: any) => {
    if (info.fileList.length > 0) {
      setFileList(info.fileList);
    }
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("audio", file.originFileObj);
    });
    formData.append("description", description);
    formData.append("category", category);

    try {
      // await axios.post("/api/audio/upload", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const authToken = localStorage.getItem(TOKEN_KEY);
      await uploadAudio(formData, authToken); // Replace with actual token
      message.success("Upload successful!");
      setFileList([]);
      setDescription("");
      setCategory("");
    } catch (error) {
      message.error("Upload failed.");
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Description" required>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter audio description"
        />
      </Form.Item>
      <Form.Item label="Category" required>
        <Select
          value={category}
          onChange={setCategory}
          placeholder="Select audio category"
        >
          {AUDIO_CATEGORIES.map((category) => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Upload Audio" required>
        <Upload
          fileList={fileList}
          onChange={handleUploadChange}
          beforeUpload={() => false}
        >
          <Button icon={<UploadOutlined />}>Select Audio Files</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Upload
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AudioUploadForm;
