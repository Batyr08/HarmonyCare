import type { PatientType } from "../../types/types";

interface PatientCardProps {
  patient: PatientType;
}

export default function PatientCard({ patient }: PatientCardProps) {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="min-w-0 gap-x-4">
        <p className="text-lg font-semibold">
          {patient.name} {patient.last_name}
        </p>
        <p className="text-sm text-gray-500">Age: {patient.age}</p>
        <p className="text-sm text-gray-500">Gender: {patient.gender}</p>
        <p className="text-sm text-gray-500">
          Health Issues: {patient.health_issues}
        </p>
        <p className="text-sm text-gray-500">
          Analysis Result: {patient.analyses_result}
        </p>
        <p className="text-sm text-gray-500">Treatment: {patient.treatment}</p>
      </div>
      <div>
        <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mx-1">
          Delete
        </button>
        <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mx-1">
          Edit
        </button>
      </div>
    </li>
  );
}