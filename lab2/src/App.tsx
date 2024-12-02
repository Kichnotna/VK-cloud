import { Route, Routes, useNavigate } from "react-router-dom";
import SecondLab from "./SecondLab/SecondLab";
import { Button } from "antd";
import ThirdLab from "./ThirdLab/ThirdLab";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/second-lab" element={<SecondLab />} />
        <Route path="/third-lab" element={<ThirdLab />} />
      </Routes>
      <Button onClick={() => navigate("/second-lab")}>Вторая</Button>
      <Button onClick={() => navigate("/third-lab")}>Третья</Button>
    </>
  );
}

export default App;
