export const getDate = (date: number) => {
    let finalDate = new Date(date);
    return finalDate.toLocaleDateString();
}