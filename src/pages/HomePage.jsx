import { useEffect, useState } from "react";
import axios from "axios";
import PageContainer from "../components/container/PageContainer";
import SectionTitle from "../components/typography/SectionTitle";
import { Plus } from "lucide-react";
import { formatDate } from "../utils/format-date";

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/activity")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <PageContainer>
      <SectionTitle title="Activity" />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-6">
          <div>
            <a
              href="/create"
              className="bg-black flex gap-2 items-center px-4 py-2 text-white rounded-md w-fit font-semibold"
            >
              <Plus className="h-4 w-4" /> Tambah Data
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mdd:gap-6 grid-cols-1">
            {activities?.data?.map((activity) => (
              <div
                className="p-4 rounded-xl border border-gray-300 shadow-sm space-y-2"
                key={activity.id}
              >
                <h1 className="text-lg font-semibold">{activity.name}</h1>
                <p className="text-gray-500">
                  {formatDate(activity.created_at)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}
