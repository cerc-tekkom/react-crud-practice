import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PageContainer from "../components/container/PageContainer";
import SectionTitle from "../components/typography/SectionTitle";

export default function UpdateActivityPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/activity/${id}`
      );
      setName(response.data.data.name);
    } catch (error) {
      console.error("Gagal mengambil data activity:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/api/activity/${id}`, { name });
      navigate("/");
    } catch (error) {
      console.error("Gagal memperbarui activity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div>
        <SectionTitle title={"Update"} />
        <form onSubmit={handleUpdate} className="space-y-4 max-w-xl">
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </PageContainer>
  );
}
