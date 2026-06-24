import { getAllLawyers } from "@/lib/api/lawyers";
import LawyersCard from "@/components/lawyer/LawyersCard";
import LawyerFilters from "@/components/lawyer/LawyerFilters";
import LawyerPagination from "@/components/lawyer/LawyerPagination";
import { services } from "@/lib/api/services";
import { Suspense } from "react";

const LawyersPage = async ({ searchParams }) => {
  const { search = '', category = '', page = '1' } = await searchParams
  const currentPage = Number(page)

  const [{ lawyers, total, totalPages }, allServices] = await Promise.all([
    getAllLawyers({ search, category, page: currentPage }),
    services(),
  ])

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Our Legal Experts
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {total} lawyer{total !== 1 ? 's' : ''} found
          {category ? ` in ${category}` : ''}
          {search ? ` for "${search}"` : ''}
        </p>
      </div>

      {/* Filters */}
      <Suspense>
        <LawyerFilters />
      </Suspense>

      {/* Grid or empty state */}
      {lawyers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-6xl mb-4">⚖️</span>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No lawyers found</h3>
          <p className="text-sm text-slate-400">Try adjusting your search or clearing the filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {lawyers.map((lawyer) => {
              const currentLawyerId = lawyer.lawyerId || lawyer._id
              const lawyerSpecificServices = allServices?.filter(
                (s) => s.lawyerId === currentLawyerId
              ) || []

              return (
                <LawyersCard
                  key={lawyer._id?.$oid || lawyer._id}
                  services={lawyerSpecificServices}
                  lawyer={lawyer}
                />
              )
            })}
          </div>

          {/* Pagination */}
          <Suspense>
            <LawyerPagination totalPages={totalPages} currentPage={currentPage} />
          </Suspense>
        </>
      )}

    </div>
  )
}

export default LawyersPage