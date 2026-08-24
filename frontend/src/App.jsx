import { useState } from "react";

import DeveloperSearch from "./components/DeveloperSearch";
import { getDeveloperDetails } from "./services/developerService";
import GraphView from "./components/GraphView";
import DeveloperInfo from "./components/DeveloperInfo";

const App = () => {
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 

  const handleSearch = async (name) => {
    try {
      setLoading(true);
      setError("");
      setDeveloper(null);

      const data = await getDeveloperDetails(name);

      if (!data || data.success === false) {
        throw new Error("Developer not found");
      }

      setDeveloper(data);
    } catch (error) {
      console.error(error);

      setDeveloper(null);
      setError("Developer not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>DevGraph Explorer</h1>

      <DeveloperSearch onSearch={handleSearch} />

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {developer && (
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <DeveloperInfo developer={developer} />

          <div style={{ flex: 1 }}>
            <GraphView developer={developer} />
          </div>
        </div>
      )}

    </div>
  );
};

export default App;