import Button from "antd/es/button/button";
import Card from "antd/es/card/Card";
import {CardTitle} from "./CardTitle";

interface Props {
    birthdays: Birthday[];
    handleDelete: (id: string) => void;
    handleOpen: (birthday: Birthday) => void;
}

export const Birthdays = ({birthdays, handleDelete, handleOpen}: Props) => {
    return (
        <div>
            {birthdays.map((birthday: Birthday) => (
                <Card style={{marginBottom: "5px"}}
                      key={birthday.id}
                      title={<CardTitle name={birthday.name} date={birthday.date} image={birthday.image}/>}
                >
                    <p>{birthday.description}</p>
                    <div className="card_buttons">
                        <Button onClick={() => handleOpen(birthday)}>Редактировать</Button>
                        <Button onClick={() => handleDelete(birthday.id)} style={{color: "red"}}>Удалить</Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}