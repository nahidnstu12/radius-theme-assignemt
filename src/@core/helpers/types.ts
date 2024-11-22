import { Prisma } from "@prisma/client";

const postWithUser = Prisma.validator<Prisma.PostArgs>()({
  include: {
    user: {
      select: {
        email: true,
        name: true,
      },
    },
  },
});

export type PostWithUser = Prisma.PostGetPayload<typeof postWithUser>;
