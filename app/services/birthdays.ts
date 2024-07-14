export interface BirthdayRequest {
    name: string;
    description: string;
    date: Date;
    image: File | null;
}

export const getAllBirthdays = async (intervalTime: string, searchString: string) => {
    const response = await fetch(`http://localhost:5149/Birthdays?intervalTime=${intervalTime}&searchString=${searchString}`);

    return response.json();
};

export const createBirthday = async (birthdayRequest: BirthdayRequest) => {
    const form = new FormData();
    form.append('name', birthdayRequest.name);
    form.append('description', birthdayRequest.description);
    form.append('date', birthdayRequest.date.toISOString());
    // @ts-ignore
    form.append('image', birthdayRequest.image);

    await fetch("http://localhost:5149/Birthdays", {
        method: "POST",
        body: form,
    });
};

export const updateBirthday = async (id: string, birthdayRequest: BirthdayRequest) => {
    const form = new FormData();
    form.append('name', birthdayRequest.name);
    if (birthdayRequest.description != null)
    form.append('description', birthdayRequest.description);
    else form.append('description', "");
    form.append('date', birthdayRequest.date.toISOString());
    // @ts-ignore
    form.append('image', birthdayRequest.image);
    await fetch(`http://localhost:5149/Birthdays/${id}`, {
        method: "PUT",
        body: form,
    });
};

export const deleteBirthday = async (id: string) => {
    await fetch(`http://localhost:5149/Birthdays/${id}`, {
        method: "DELETE",
    });
};
