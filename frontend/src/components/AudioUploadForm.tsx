import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
// import axios from "axios";
import { uploadAudio } from "../api/apis";
import { TOKEN_KEY } from "../authentication/AuthProvider";
import { AUDIO_CATEGORIES } from "../constants";

const AudioUploadForm: React.FC = () => {
  const [file, setFile] = useState<UploadFile | null>(null);
  const [form] = Form.useForm();
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");

  const handleUploadChange = (info: UploadChangeParam<UploadFile>) => {
    setFile(info.fileList[0] || null);
  };

  const handleSubmit = async (values: {
    description: string;
    category: string;
  }) => {
    const { description, category } = values;
    if (!file) {
      message.error("Please select an audio file.");
      return;
    }
    if (!file.originFileObj) {
      message.error("File data is missing");
      return;
    }
    const formData = new FormData();
    formData.append("audio", file.originFileObj);
    formData.append("description", description);
    formData.append("category", category);

    try {
      const authToken = localStorage.getItem(TOKEN_KEY);
      if (!authToken) {
        message.error("Authentication token not found.");
        // setLoading(false);
        return;
      }
      await uploadAudio(formData, authToken);
      message.success("Upload successful!");
      setFile(null);
      form.resetFields();
      // setDescription("");
      // setCategory("");
    } catch (error) {
      message.error("Upload failed.");
      console.error("Upload error:", error);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter a description" }]}
      >
        <Input
        // value={description}
        // onChange={(e) => setDescription(e.target.value)}
        // placeholder="Enter audio description"
        />
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select
        // value={category}
        // onChange={setCategory}
        // placeholder="Select audio category"
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
          fileList={file ? [file] : []}
          onChange={handleUploadChange}
          beforeUpload={() => false}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Select Audio File</Button>
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
