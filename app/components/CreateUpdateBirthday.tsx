import React, { useEffect, useState } from "react";
import Modal from "antd/es/modal/Modal";
import { BirthdayRequest } from "../services/birthdays";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import utc from 'dayjs/plugin/utc'; dayjs.extend(utc);

interface Props {
    mode: Mode;
    values: Birthday;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: BirthdayRequest) => void;
    handleUpdate: (id: string, request: BirthdayRequest) => void;
}

export enum Mode {
    Create,
    Edit,
}

export const CreateUpdateBirthday = ({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate
}: Props) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [base64Image, setBase64Image] = useState<string>("");

    useEffect(() => {
        setName(values.name);
        setDescription(values.description);
        setDate(new Date(values.date));
    }, [values]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);

            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result as string);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleOnOk = async () => {
        const birthdayRequest: BirthdayRequest = { name, description, date, image: selectedFile };

        mode === Mode.Create
            ? handleCreate(birthdayRequest)
            : handleUpdate(values.id, birthdayRequest);
    };

    // @ts-ignore
    return (
        <Modal
            title={mode === Mode.Create ? "Добавить" : "Редактировать"}
            open={isModalOpen}
            cancelText={"Отмена"}
            onOk={handleOnOk}
            onCancel={handleCancel}
        >
            <Input
                maxLength={200}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
            />
            <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание"
            />
            <DatePicker
                defaultValue={dayjs(date)}
                onChange={(e) => setDate(dayjs(e, 'YYYY-MM-DD').utc(true).toDate())}
            />
            <div style={{ marginTop: '10px' }}>
                <label htmlFor="fileInput">Загрузить изображение:</label>
                <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'block', marginTop: '10px' }} />
            </div>
        </Modal>
    );
};
