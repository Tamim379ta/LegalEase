import { requireRole } from '@/lib/core/session';

const RecruiterLayout = async ({ children }) => {
  await requireRole('client')
  return children

};

export default RecruiterLayout;