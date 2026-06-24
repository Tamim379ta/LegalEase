import { requireRole } from '@/lib/core/session';

const RecruiterLayout = async ({ children }) => {
  await requireRole('lawyer')
  return children

};

export default RecruiterLayout;