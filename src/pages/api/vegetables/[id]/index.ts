import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { vegetableValidationSchema } from 'validationSchema/vegetables';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.vegetable
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getVegetableById();
    case 'PUT':
      return updateVegetableById();
    case 'DELETE':
      return deleteVegetableById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVegetableById() {
    const data = await prisma.vegetable.findFirst(convertQueryToPrismaUtil(req.query, 'vegetable'));
    return res.status(200).json(data);
  }

  async function updateVegetableById() {
    await vegetableValidationSchema.validate(req.body);
    const data = await prisma.vegetable.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteVegetableById() {
    const data = await prisma.vegetable.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
