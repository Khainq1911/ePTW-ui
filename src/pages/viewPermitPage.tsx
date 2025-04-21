import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPermitByIdService } from "../services/permit.service";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PermitDetail from "../components/ui/permit/permitDetail";
export default function ViewPermitPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [permit, setPermit] = useState();

  useEffect(() => {
    const getPermitById = async () => {
      try {
        const res = await getPermitByIdService(Number(id));
        setPermit(res);
      } catch (error) {}
    };
    getPermitById();
  }, [id]);

  return (
    <div
      className="w-[1200px] h-screen mx-auto overflow-x-scroll"
      style={{ height: "calc(100vh - 70px)" }}
    >
      <Button startIcon={<ArrowBackIcon />} sx={{margin:"20px 0"}} onClick={() => navigate("/permit")}>
        Back
      </Button>

      <div className="w-full min-h-[600px] rounded p-4 shadow">
        <PermitDetail permit={permit} />
      </div>
    </div>
  );
}
