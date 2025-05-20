import React, { useContext, useEffect, useState } from 'react';
import { listPermitService } from '../services/permit.service';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
} from '@mui/material';
import { isWorker } from '../hooks/useAuth';
import { formatDate } from '../utils/dayjs';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDebounce } from '../hooks/useDebounce';
import { PermitStatus } from '../types/enum';
import { useNavigate } from 'react-router-dom';
import PermitModal from '../components/ui/modal-permit-name';
import { modalContext } from '../context/permit-modal-context';

export default function Permit() {
    const [rows, setRows] = useState<any>();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [total, setTotal] = useState(0);
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('');

    const context = useContext(modalContext);
    const navigate = useNavigate();

    const debounceValue = useDebounce(query, 300);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    useEffect(() => {
        const listPermit = async () => {
            try {
                const res = await listPermitService(debounceValue, status, rowsPerPage, page);
                const rowData = res.data?.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    type: item.template.name,
                    sender: item.sender.name,
                    receiver: item.receiver.name,
                    start: formatDate(item.startTime, 'DD-MM-YYYY'),
                    end: formatDate(item.endTime, 'DD-MM-YYYY'),
                    status: item.status,
                    action: (
                        <div className="flex gap-2">
                            <Tooltip title="View">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => navigate(`/permit/${item.id}`)}
                                >
                                    <VisibilityIcon className="text-blue-600" />
                                </Button>
                            </Tooltip>

                            <Tooltip title="Revise Permit">
                                <Button
                                    variant="outlined"
                                    color="success"
                                    disabled={item.status !== PermitStatus.REVISE}
                                    onClick={() => navigate(`/permit/revise/${item.id}`)}
                                >
                                    <EditIcon />
                                </Button>
                            </Tooltip>
                        </div>
                    ),
                }));
                setRows(rowData);
                setTotal(res.total);
            } catch (error) {}
        };

        listPermit();
    }, [status, debounceValue, rowsPerPage, page]);

    return (
        <div className="w-full h-screen px-5 py-8 bg-[#F9FAFB] overflow-auto">
            <div className="md:flex md:justify-between md:items-center ">
                <div>
                    <h1 className="text-[32px] font-bold">Permits</h1>
                    <p className="font-medium text-gray-500">Easily manage all your permits here.</p>
                </div>
                <Button
                    sx={{ display: isWorker() ? 'none' : 'inline-flex' }}
                    variant="contained"
                    color="warning"
                    onClick={context?.handleModalOpen}
                    startIcon={<AddCircleOutlineIcon />}
                >
                    New Permit
                </Button>
            </div>

            <div className="border border-gray-200 p-4 rounded-xl mt-8">
                <div>
                    <h2 className="text-[26px] font-semibold">Template Library</h2>
                    <p className="font-medium text-gray-500">Browse and manage your permit templates</p>
                </div>
                <div className="flex gap-4 my-5">
                    <TextField
                        placeholder="Type name ..."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <FormControl sx={{ width: '200px' }}>
                        <InputLabel id="status-select-label">Select Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            value={status}
                            label="Select Status"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Accept">Accept</MenuItem>
                            <MenuItem value="Close">Close</MenuItem>
                            <MenuItem value="Revise">Revise</MenuItem>
                            <MenuItem value="Suspend">Suspend</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Permit ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Sender</TableCell>
                                <TableCell>Receiver</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows?.map((row: any) => (
                                <TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.sender}</TableCell>
                                    <TableCell>{row.receiver}</TableCell>
                                    <TableCell>{row.start}</TableCell>
                                    <TableCell>{row.end}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>{row.action}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            <PermitModal />
        </div>
    );
}
