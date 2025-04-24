import { useEffect, useState } from "react";
import { listPermitService } from "../services/permit.service";
import PermitCard from "../components/ui/permit/permitCard";

export default function Permit() {
  const [listPermit, setListPermit] = useState([]);
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    const listPermit = async () => {
      try {
        const res = await listPermitService();
        setListPermit(res);
      } catch (error) {}
    };

    listPermit();
  }, []);

  return (
    <div>
      <div className="flex p-4 gap-4 flex-wrap">
        {listPermit.map((item, index) => (
          <PermitCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}
