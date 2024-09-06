import { z } from 'zod';

const UserSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
});

export default UserSchema;
