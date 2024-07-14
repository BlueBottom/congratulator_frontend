"use client";

import React, {useEffect, useRef, useState} from "react";
import Button from "antd/es/button/button";
import {Birthdays} from "../components/Birthdays";
import {BirthdayRequest, createBirthday, deleteBirthday, getAllBirthdays, updateBirthday} from "../services/birthdays";
import {CreateUpdateBirthday, Mode} from "../components/CreateUpdateBirthday";
import Title from "antd/es/typography/Title";
import {Select} from "antd";
import Input from "antd/es/input/Input";
import axios from "axios";

export default function BirthdaysPage() {
    const defaultValues = {
        name: "",
        description: "",
        date: new Date(),
    } as Birthday;

    const fileRef = useRef(null);

    const [values, setValues] = useState<Birthday>(defaultValues);
    const [birthdays, setBirthdays] = useState<Birthday[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);
    const [value, setSelectValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const getBirthdays = async () => {
            const birthdays = await getAllBirthdays(value, inputValue);
            setLoading(false);
            setBirthdays(birthdays);
        };
        getBirthdays();
    }, [value, inputValue]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleCreateBirthday = async (request: BirthdayRequest) => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("data", JSON.stringify(request));
            await axios.post("/upload-birthday", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } else {
            await createBirthday(request);
        }
        closeModal();

        const birthdays = await getAllBirthdays(value, inputValue);
        setBirthdays(birthdays);
    };

    const handleUpdateBirthday = async (id: string, request: BirthdayRequest) => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("data", JSON.stringify(request));
            await axios.put(`/upload-birthday/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } else {
            await updateBirthday(id, request);
        }
        closeModal();

        const birthdays = await getAllBirthdays(value, inputValue);
        setBirthdays(birthdays);
    };

    const handleDeleteBirthday = async (id: string) => {
        await deleteBirthday(id);
        closeModal();

        const birthdays = await getAllBirthdays(value, inputValue);
        setBirthdays(birthdays);
    };

    const openModal = () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    };

    const openEditModal = (birthday: Birthday) => {
        setMode(Mode.Edit);
        setValues(birthday);
        setIsModalOpen(true);
    };

    const handleChange = (value: string) => {
        setSelectValue(value);
    };

    const handleInput = (inputValue: string) => {
        setInputValue(inputValue);
    };

    const applyFilter = async () => {
        setLoading(true);
        const filteredBirthdays = await getAllBirthdays(value, inputValue);
        setBirthdays(filteredBirthdays);
        setLoading(false);
    };

    return (
        <div className={"filters"}>
            <Button type="primary" onClick={openModal} style={{marginRight: "10px"}}>Добавить</Button>

            <CreateUpdateBirthday
                mode={mode}
                values={values}
                isModalOpen={isModalOpen}
                handleCreate={handleCreateBirthday}
                handleUpdate={handleUpdateBirthday}
                handleCancel={closeModal}
            />
            <Select
                defaultValue="Все"
                style={{width: 180, marginRight: "10px"}}
                onChange={handleChange}
                options={[
                    {label: 'Все', value: 'all'},
                    {label: 'Сегодня', value: 'today'},
                    {label: 'Завтра', value: 'tomorrow'},
                    {label: 'Ближайшие 10 дней', value: '10 days'},
                    {label: 'В этом месяце', value: 'this month'},
                ]}
            />
            <Input placeholder={"Введите имя"} style={{width: 180, marginRight: "10px"}}
                   onChange={(e) => setInputValue(e.target.value)}/>
            <Button type="primary" onClick={applyFilter}>Применить</Button>

            {loading ? (<Title>Загрузка...</Title>) : (
                <Birthdays birthdays={birthdays} handleOpen={openEditModal} handleDelete={handleDeleteBirthday}/>
            )}
        </div>
    );
}
