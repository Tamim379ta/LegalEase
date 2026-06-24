import { manageLawyers } from '@/lib/api/lawyers';
import { Table } from '@heroui/react';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import { DeleteLawyerButton } from '@/components/lawyer/DeleteLawyerBtnModal';

const statusStyles = {
  available: { badge: "text-green-700 border-green-500/40 bg-green-50", dot: "bg-green-600" },
  busy: { badge: "text-orange-700 border-orange-500/40 bg-orange-50", dot: "bg-orange-500" },
};

const ManageLawyersPage = async () => {
  const lawyers = await manageLawyers();
  const hasLawyers = lawyers && lawyers.length > 0;

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between border-b border-[#1A2E44]/20 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-black">Manage Lawyers</h1>
          <p className="mt-1 text-sm text-black/60">
            View and remove registered lawyers from the platform.
          </p>
        </div>
        {hasLawyers && (
          <div className="inline-flex items-center rounded-lg bg-[#1A2E44]/5 border border-[#1A2E44]/20 px-3 py-1.5 text-xs font-semibold text-black">
            Total: {lawyers.length}
          </div>
        )}
      </div>

      {hasLawyers ? (
        <div className="overflow-hidden rounded-2xl border border-[#1A2E44]">
          <Table className="w-full text-left text-sm text-black" aria-label="Manage Lawyers Table">
            <Table.ScrollContainer>
              <Table.Content aria-label="Lawyers List">
                <Table.Header className="border-b border-[#1A2E44] text-xs font-bold uppercase tracking-wider text-black">
                  <Table.Column className="p-4" isRowHeader>Lawyer</Table.Column>
                  <Table.Column className="p-4">Specialization</Table.Column>
                  <Table.Column className="p-4">Fee</Table.Column>
                  <Table.Column className="p-4">Status</Table.Column>
                  <Table.Column className="p-4">Joined</Table.Column>
                  <Table.Column className="p-4 text-right">Actions</Table.Column>
                </Table.Header>

                <Table.Body>
                  {lawyers.map((lawyer) => {
                    const lawyerDbId = lawyer._id?.$oid || lawyer._id;
                    const status = lawyer.status?.toLowerCase() || "available";
                    const styles = statusStyles[status] || statusStyles.available;
                    const joinedDate = new Date(lawyer.createdAt?.$date || lawyer.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    });

                    return (
                      <Table.Row key={lawyerDbId} className="border-b border-[#1A2E44]/40 hover:bg-gray-50/50 transition-colors">

                        {/* Lawyer name + photo */}
                        <Table.Cell isRowHeader className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 relative rounded-full overflow-hidden border border-[#1A2E44]/20 bg-white flex-shrink-0">
                              {lawyer.photoUrl ? (
                                <Image src={lawyer.photoUrl} alt={lawyer.name} fill className="object-cover" unoptimized />
                              ) : (
                                <FaUserCircle className="w-full h-full text-gray-300" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-black text-sm">{lawyer.name}</p>
                              <p className="text-[11px] text-black/40 font-mono">
                                #{(lawyer.lawyerId || lawyerDbId).slice(-6).toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </Table.Cell>

                        {/* Specialization */}
                        <Table.Cell className="p-4">
                          <span className="inline-block rounded-md border border-[#1A2E44] px-2.5 py-1 text-xs text-black">
                            {lawyer.specialization}
                          </span>
                        </Table.Cell>

                        {/* Fee */}
                        <Table.Cell className="p-4 font-semibold text-black">
                          ৳{lawyer.fee ? lawyer.fee.toLocaleString() : "0"}
                        </Table.Cell>

                        {/* Status */}
                        <Table.Cell className="p-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${styles.badge}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                            {status}
                          </span>
                        </Table.Cell>

                        {/* Joined */}
                        <Table.Cell className="p-4 text-black/60 text-xs">
                          {joinedDate}
                        </Table.Cell>

                        {/* Delete */}
                        <Table.Cell className="p-4 text-right">
                          <DeleteLawyerButton
                            lawyerId={lawyerDbId}
                            lawyerName={lawyer.name}
                          />
                        </Table.Cell>

                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer />
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#1A2E44]/20 bg-white p-12 text-center">
          <div className="rounded-full bg-gray-100 p-4 text-gray-400 mb-4">
            <FaUserCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-black">No lawyers registered</h3>
          <p className="mt-1 max-w-sm text-sm text-black/50">
            Lawyers will appear here once they register on the platform.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageLawyersPage;