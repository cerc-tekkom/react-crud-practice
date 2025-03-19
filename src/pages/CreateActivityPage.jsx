import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/container/PageContainer";
import SectionTitle from "../components/typography/SectionTitle";

export default function CreateActivityPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:3000/api/activity", { name });
      navigate("/");
    } catch (error) {
      console.error("Gagal menambahkan activity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div>
        <SectionTitle title={"Tambah Activity"} />

        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-gray-700">Note</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-semibold flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? "Loading..." : "Tambah"}
          </button>
        </form>
      </div>
    </PageContainer>
  );
}
