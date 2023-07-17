const mapping: Record<string, string> = {
  users: 'user',
  vegetables: 'vegetable',
  vendors: 'vendor',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
