export const useDateFormatter = () => {
  const formatDate = (date: string, format: string) => {
    const instance = new Date(date);

    const year = String(instance.getFullYear());
    const month = String(instance.getMonth() + 1).padStart(2, '0');
    const day = String(instance.getDate()).padStart(2, '0');

    const hour = String(instance.getHours()).padStart(2, '0');
    const minute = String(instance.getMinutes()).padStart(2, '0');
    const second = String(instance.getSeconds()).padStart(2, '0');

    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hour)
      .replace('mm', minute)
      .replace('ss', second);
  };

  return {
    formatDate,
  };
};
