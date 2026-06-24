import { requireRole } from '@/lib/core/session';

const RecruiterLayout = async ({ children }) => {
  await requireRole('admin')
  return children

};

export default RecruiterLayout;