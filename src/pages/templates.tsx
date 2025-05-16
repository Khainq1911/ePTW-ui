import { useEffect, useState } from 'react';
import { queryTemplatesService } from '../services/templates.service';
import { useDebounce } from '../hooks/useDebounce';
import {
    Button,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { routeConfig } from '../configs/router.config';
import { useNavigate } from 'react-router-dom';
import { isWorker } from '../hooks/useAuth';
import SearchIcon from '@mui/icons-material/Search';
import { formatDate } from '../utils/dayjs';
import { green, red } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TemplateType } from '../types/template.type';

export default function Home() {
    const [templates, setTemplates] = useState([]);
    const [query, setQuery] = useState<string>('');
    const debouncedValue = useDebounce(query, 300);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await queryTemplatesService(debouncedValue);

                const rowData = res.map((item: TemplateType) => ({
                    id: item.id,
                    name: item.name,
                    createdBy: 'Admin',
                    createdAt: formatDate(item.created_at),
                    active: item.isActive ? (
                        <Tooltip title="Active">
                            <CheckCircleIcon sx={{ color: green[500] }} />
                        </Tooltip>
                    ) : (
                        <Tooltip title="Inactive">
                            <CancelIcon sx={{ color: red[500] }} />
                        </Tooltip>
                    ),
                    action: (
                        <>
                            <Tooltip title="View">
                                <IconButton onClick={() => navigate(`/template/view/${item.id}`)}>
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Update">
                                <IconButton onClick={() => navigate(`/template/update/${item?.id}`)}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    ),
                }));

                setTemplates(rowData);
            } catch {}
        };
        fetchTemplates();
    }, [debouncedValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    return (
        <div className="w-full h-screen px-5 py-8 bg-[#F9FAFB] overflow-auto">
            <div className="md:flex md:justify-between md:items-center ">
                <div>
                    <h1 className="text-[32px] font-bold">Templates</h1>
                    <p className="font-medium text-gray-500">Manage your permit templates</p>
                </div>
                <Button
                    sx={{ display: isWorker() ? 'none' : 'inline-flex' }}
                    variant="contained"
                    color="warning"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => navigate(routeConfig.addTemplate)}
                >
                    New Template
                </Button>
            </div>

            <div className="border border-gray-200 p-4 rounded-xl mt-8">
                <div>
                    <h2 className="text-[26px] font-semibold">Template Library</h2>
                    <p className="font-medium text-gray-500">Browse and manage your permit templates</p>
                </div>
                <div className="flex gap-4 my-5">
                    <TextField
                        fullWidth
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
                    <Button variant="outlined" color="success">
                        Filter
                    </Button>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Template ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Created By</TableCell>
                                <TableCell>Created Date</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {templates.map((row: any) => (
                                <TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.createdBy}</TableCell>
                                    <TableCell>{row.createdAt}</TableCell>
                                    <TableCell>{row.active}</TableCell>
                                    <TableCell>{row.action}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
