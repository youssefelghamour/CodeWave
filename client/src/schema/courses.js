import { normalize, schema } from "normalizr";


const courses = new schema.Entity("courses");

export const coursesNormalizer = (data) => normalize(data, [courses]).entities;