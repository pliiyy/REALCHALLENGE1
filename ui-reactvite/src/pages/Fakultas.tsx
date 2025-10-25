import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
  Card,
  Typography,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

interface Faculty {
  id: number;
  nama_fakultas: string;
  kode_fakultas: string;
  keterangan?: string;
}

const Fakultas: React.FC = () => {
  const [form] = Form.useForm();
  const [faculties, setFaculties] = useState<Faculty[]>([
    {
      id: 1,
      nama_fakultas: "Fakultas Teknologi Informasi",
      kode_fakultas: "FTI",
      keterangan: "Bidang teknologi dan sistem informasi",
    },
    {
      id: 2,
      nama_fakultas: "Fakultas Ekonomi dan Bisnis",
      kode_fakultas: "FEB",
      keterangan: "Bidang manajemen dan akuntansi",
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editing, setEditing] = useState<Faculty | null>(null);

  const showModal = (record?: Faculty) => {
    setEditing(record || null);
    form.setFieldsValue(
      record || { nama_fakultas: "", kode_fakultas: "", keterangan: "" }
    );
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setEditing(null);
    setIsModalVisible(false);
  };

  const handleSave = (values: Faculty) => {
    if (editing) {
      setFaculties((prev) =>
        prev.map((item) =>
          item.id === editing.id ? { ...item, ...values } : item
        )
      );
      message.success("Fakultas berhasil diperbarui!");
    } else {
      setFaculties((prev) => [...prev, { id: Date.now(), ...values }]);
      message.success("Fakultas berhasil ditambahkan!");
    }
    setIsModalVisible(false);
  };

  const handleDelete = (id: number) => {
    setFaculties((prev) => prev.filter((item) => item.id !== id));
    message.success("Fakultas berhasil dihapus!");
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      width: "60px",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Nama Fakultas",
      dataIndex: "nama_fakultas",
      className: "font-medium text-gray-800",
    },
    {
      title: "Kode Fakultas",
      dataIndex: "kode_fakultas",
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      ellipsis: true,
    },
    {
      title: "Aksi",
      key: "action",
      align: "center" as const,
      render: (_: any, record: Faculty) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            type="link"
            className="text-blue-600 hover:text-blue-800"
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Yakin ingin menghapus fakultas ini?"
            okText="Ya"
            cancelText="Tidak"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              icon={<DeleteOutlined />}
              type="link"
              className="text-red-500 hover:text-red-700"
            >
              Hapus
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        className="shadow-sm border border-gray-200 rounded-xl bg-white"
        title={
          <div className="flex items-center gap-2 text-gray-800">
            <ApartmentOutlined className="text-blue-600 text-lg" />
            <Title level={4} className="!mb-0">
              Manajemen Fakultas
            </Title>
          </div>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            className="rounded-md"
          >
            Tambah Fakultas
          </Button>
        }
      >
        <Table
          bordered={false}
          columns={columns}
          dataSource={faculties}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="rounded-md"
        />
      </Card>

      {/* Modal Form */}
      <Modal
        title={editing ? "Edit Fakultas" : "Tambah Fakultas"}
        open={isModalVisible}
        onCancel={handleCancel}
        okText={editing ? "Update" : "Simpan"}
        onOk={() => form.submit()}
        centered
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSave}
          className="mt-3"
        >
          <Form.Item
            label="Nama Fakultas"
            name="nama_fakultas"
            rules={[{ required: true, message: "Nama fakultas wajib diisi!" }]}
          >
            <Input placeholder="Contoh: Fakultas Teknologi Informasi" />
          </Form.Item>

          <Form.Item
            label="Kode Fakultas"
            name="kode_fakultas"
            rules={[{ required: true, message: "Kode fakultas wajib diisi!" }]}
          >
            <Input placeholder="Contoh: FTI" maxLength={10} />
          </Form.Item>

          <Form.Item label="Keterangan" name="keterangan">
            <Input.TextArea rows={3} placeholder="Deskripsi fakultas..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Fakultas;
