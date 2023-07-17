import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { vendorValidationSchema } from 'validationSchema/vendors';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getVendors();
    case 'POST':
      return createVendor();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getVendors() {
    const data = await prisma.vendor
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'vendor'));
    return res.status(200).json(data);
  }

  async function createVendor() {
    await vendorValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.vegetable?.length > 0) {
      const create_vegetable = body.vegetable;
      body.vegetable = {
        create: create_vegetable,
      };
    } else {
      delete body.vegetable;
    }
    const data = await prisma.vendor.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
