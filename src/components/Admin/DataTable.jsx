import EmptyState from "../common/EmptyState";
import LoadingSpinner from "../common/LoadingSpinner";

export default function DataTable({ columns, rows, loading, emptyTitle }) {
  if (loading) {
    return <LoadingSpinner label="Loading records" />;
  }

  if (!rows?.length) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[820px] text-left">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-5 py-4 text-xs font-black uppercase tracking-widest text-slate-400">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.id || row.booking_id} className="transition hover:bg-slate-50/70">
              {columns.map((column) => (
                <td key={column.key} className="px-5 py-4 text-sm font-semibold text-slate-700">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
