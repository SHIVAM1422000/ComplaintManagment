import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import TagBadge from "./TagBadge";
import { Link } from "react-router-dom";

export default function InboxTable({ data }) {
  return (
    <div className="card">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="py-2">Message</th>
            <th>Tag</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Channel</th>
          </tr>
        </thead>

        <tbody>
          {data.map(q => (
            <tr key={q._id} className="border-b hover:bg-gray-50">
              <td className="py-3">
                <Link to={`/query/${q._id}`} className="font-medium hover:underline">
                  {q.message.slice(0, 40)}...
                </Link>
              </td>
              <td><TagBadge tag={q.tag} /></td>
              <td><PriorityBadge level={q.priority} /></td>
              <td><StatusBadge status={q.status} /></td>
              <td className="capitalize">{q.channel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
