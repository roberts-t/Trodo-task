export const dateStrToFormattedDate = (dateStr?: string): string | null => {
    try {
        if (!dateStr) {
            return null;
        }
        const date = new Date(dateStr);

        // Check if date is valid
        if (isNaN(date.getTime())) {
            return null;
        }

        // Convert to format dd.mm.yyyy
        const day = date.getDate();
        const month = date.getMonth() + 1; // getMonth() returns 0-11
        const year = date.getFullYear();

        return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
    } catch {
        return null;
    }
}
