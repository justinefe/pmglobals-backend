import validate from "./validators";

import { createSchema, IdSchema, updateSchema } from "./validators/schemas/user";

export default {
  validate,
  createSchema,
  IdSchema,
  updateSchema
};
