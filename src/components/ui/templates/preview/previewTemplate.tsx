import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { useState } from "react";
import { listUserByRole } from "../../../../services/auth.service";
import { formatDate } from "../../../../utils/dayjs";
import PermitInformation from "../../permit/information";
import { renderPreviewTemplate } from "../../../../utils/renderPreviewTemplate";

interface PreviewProps {
  item: any;
  userName?: string | undefined;
  dispatch?: any;
  state?: any;
}

export default function TemplatePreview({
  item,
  userName,
  dispatch,
  state,
}: PreviewProps) {
  const [listUsers, setListUsers] = useState([]);

  const listUser = async () => {
    if (listUsers.length > 0) return;
    try {
      const res = await listUserByRole(2);
      setListUsers(res);
    } catch {}
  };

  return (
    <div className="h-full shadow bg-white p-10 rounded-xl grid gap-8">
      <div className="flex justify-between items-center">
        <p>
          <strong className="mr-1">Template ID:</strong>
          {item?.id}
        </p>
        <FormControl sx={{ m: 1, minWidth: 200, marginBottom: "30px" }}>
          <InputLabel id="receiver">Receiver</InputLabel>
          <Select
            labelId="receiver"
            id="receiver"
            label="Receiver"
            value={state?.receiverId || ""}
            onFocus={listUser}
            onChange={(e: any) =>
              dispatch({ type: "SET_RECEIVER", payload: e.target.value })
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {listUsers.map((user: any) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Divider />
      <div className="flex justify-between items-center">
        <p className="font-semibold text-4xl">{item?.name}</p>
        <div className="flex justify-center items-center gap-2">
          <div>
            <p className="text-[16px] text-end">
              {userName || "[User Full Name]"}
            </p>
            <p className="text-gray-400 text-[14px] text-end">
              Created
              <span className="ml-1">
                {formatDate(item?.created_at, "dd, MM, DD, YYYY HH:MM A")}
              </span>
            </p>
          </div>
          <AccountCircleRoundedIcon sx={{ fontSize: "32px" }} />
        </div>
      </div>
      <PermitInformation dispatch={dispatch} state={state} />
      <div className="grid gap-8">
        {(state ? state?.data : item?.fields)?.map(
          (field: any, index: number) => (
            <div key={index}>{renderPreviewTemplate(field, dispatch)}</div>
          ),
        )}
      </div>
    </div>
  );
}
