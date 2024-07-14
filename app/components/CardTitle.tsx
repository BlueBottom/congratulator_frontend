interface Props {
    name: string;
    date: Date;
    image: string;
}

interface Months {
    1: 'января',
    2: 'февраля',
    3: 'марта',
    4: 'апреля',
    5: 'мая',
    6: 'июня',
    7: 'июля',
    8: 'августа',
    9: 'сентября',
    10: 'октября',
    11: 'ноября',
    12: 'декабря'
}

function getMonth(month: keyof Months) {
    const monthDisplays = {
        1: 'января',
        2: 'февраля',
        3: 'марта',
        4: 'апреля',
        5: 'мая',
        6: 'июня',
        7: 'июля',
        8: 'августа',
        9: 'сентября',
        10: 'октября',
        11: 'ноября',
        12: 'декабря'
    }

    return monthDisplays[month]
}

export const CardTitle = ({name, date, image}: Props) => {
    const d = new Date(date);
    const currMonth = d.getMonth() + 1;

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            textAlign: "center",
        }}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                {image && <img src={"data:image/jpg;base64, " + image} alt={`${name}'s image`}
                               style={{width: "100px", height: "100px", margin: "10px"}}/>}
                <p>{name}</p>
            </div>
            <p style={{marginLeft: "auto"}}>{d.getDate()} {getMonth(currMonth as keyof Months)} {d.getFullYear()}</p>
        </div>

    );
}