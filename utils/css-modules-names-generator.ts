const getCssModulesNamesGenerator = (
  isProduction: boolean,
): ((name: string, filename: string) => string) => {
  if (!isProduction) return (name) => name;

  const generatedNames = new Map<string, string>();

  // a-z
  const chars = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

  const [firstAvailableChar] = chars;
  const currentNameChars: string[] = [];

  const iterateName = () => {
    const index = currentNameChars.length - 1;
    const lastAvailableChar = chars[chars.length - 1];

    switch (true) {
      // When empty array
      case !currentNameChars.length:
        currentNameChars.push(firstAvailableChar);
        break;
      // When last char in array equal to last available char
      case currentNameChars[index] === lastAvailableChar:
        if (index > 0) {
          for (let i = index; i >= 0; i--) {
            const previousChar = currentNameChars[i - 1];
            if (previousChar !== lastAvailableChar) {
              currentNameChars[i - 1] = chars[chars.findIndex((char) => char === previousChar) + 1];
            }
          }
        } else {
          currentNameChars.push(firstAvailableChar);
        }
        currentNameChars[index] = firstAvailableChar;
        break;
      // Just change last element in array
      default:
        currentNameChars[index] = chars[chars.indexOf(currentNameChars[index]) + 1];
    }
  };

  const generateNewName = (key: string) => {
    iterateName();

    const currentName = currentNameChars.join('');
    generatedNames.set(key, currentName);

    return currentName;
  };

  return (name: string, filename: string): string => {
    const key = `${name}_${filename}`;
    return generatedNames.get(key) || generateNewName(key);
  };
};

export default getCssModulesNamesGenerator;
