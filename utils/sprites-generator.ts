import fs from 'fs';
import path from 'path';
// @ts-expect-error old lib without types
import svgstore from 'svgstore';

const SPRITES = ['main'];
const EXTENSION = '.svg';

const iconsDirectory = path.resolve(import.meta.dirname, '../src/assets/icons');
const spritesDirectory = path.resolve(import.meta.dirname, '../src/assets/sprites');

const getIconsNames = (iconsPath: string) =>
  fs
    .readdirSync(iconsPath)
    .filter((icon) => path.extname(icon) === EXTENSION)
    .map((icon) => path.basename(icon, EXTENSION));

const createSprites = () => {
  if (!fs.existsSync(spritesDirectory)) fs.mkdirSync(spritesDirectory);

  SPRITES.forEach((sprite) => {
    const store = svgstore({ copyAttrs: true, renameDefs: true });
    const iconsPath = path.resolve(iconsDirectory, sprite);
    const icons = getIconsNames(iconsPath);

    icons.forEach((icon) => {
      const iconPath = path.resolve(iconsPath, `${icon}${EXTENSION}`);
      const content = fs.readFileSync(iconPath, 'utf8');
      store.add(icon, content, {});
    });

    const spritePath = path.resolve(spritesDirectory, `${sprite}${EXTENSION}`);
    fs.writeFileSync(spritePath, store.toString());
  });
};

createSprites();
