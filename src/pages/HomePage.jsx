import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PageContainer from "../components/container/PageContainer";
import SectionTitle from "../components/typography/SectionTitle";
import { Plus, Trash2 } from "lucide-react";
import { formatDate } from "../utils/format-date";

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/activity");
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus activity ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/activity/${id}`);
      fetchActivities();
    } catch (error) {
      console.error("Gagal menghapus activity:", error);
    }
  };

  return (
    <PageContainer>
      <SectionTitle title="Activity" />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-6">
          <div>
            <Link
              to="/create"
              className="bg-black flex gap-2 items-center px-4 py-2 text-white rounded-md w-fit font-semibold"
            >
              <Plus className="h-4 w-4" /> Tambah Data
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mdd:gap-6 grid-cols-1">
            {activities?.data?.map((activity) => (
              <div
                className="p-4 rounded-xl border border-gray-300 shadow-sm space-y-2 relative"
                key={activity.id}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(activity.id);
                  }}
                  className="absolute top-2 right-2 text-red-500 cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <Link to={`/update/${activity.id}`} className="block">
                  <h1 className="text-lg font-semibold">{activity.name}</h1>
                  <p className="text-gray-500">
                    {formatDate(activity.created_at)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}
