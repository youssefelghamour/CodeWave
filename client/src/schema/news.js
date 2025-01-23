import { normalize, schema } from "normalizr";


const news = new schema.Entity("news");

export const newsNormalizer = (data) => normalize(data, [news]).entities;