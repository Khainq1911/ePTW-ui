import { useEffect, useState } from "react";
import { listPermitService } from "../services/permit.service";
import PermitCard from "../components/ui/permit/permitCard";

export default function Permit() {
  const [listPermit, setListPermit] = useState([]);
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
      <div>
        {listPermit.map((item, index) => (
          <PermitCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}
