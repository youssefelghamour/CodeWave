import { normalize, schema } from "normalizr";


const updates = new schema.Entity("updates");

export const updatesNormalizer = (data) => normalize(data, [updates]).entities;