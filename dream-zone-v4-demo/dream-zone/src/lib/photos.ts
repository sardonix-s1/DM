/**
 * Демонстрационные стоковые фото с Pexels (бесплатная лицензия, указание автора не требуется:
 * https://www.pexels.com/license/). Все ссылки собраны здесь: чтобы заменить фото на настоящие,
 * положите файлы в public/images и поменяйте пути в src/data и src/config/brand.ts.
 */
export const pexels = (id: number, width = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
