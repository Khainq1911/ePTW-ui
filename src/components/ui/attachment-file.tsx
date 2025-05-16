import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button } from '@mui/material';

export default function AttachmentFile({ files, setFiles }: any) {
    const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const uploadedFileNames = selectedFiles.map((item: any) => {
            return item.name;
        });

        setFiles(uploadedFileNames);
    };

    const handleDeleteFile = async (item: string) => {
        const updatedFiles = files.filter((file: string) => file !== item);
        setFiles(updatedFiles);
    };

    return (
        <div className="flex flex-col w-full mt-4">
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudUploadOutlinedIcon className="text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">Pdf file</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleUploadFile} multiple />
            </label>
            <div className="flex gap-4 mt-2 flex-wrap ">
                {files?.map((item: any, index: number) => {
                    return (
                        <div key={index} className="p-2 border border-gray-400 rounded-[5px] min-w-[200px]">
                            <div className="flex">
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDeleteFile(item)}
                                >
                                    <CloseOutlinedIcon />
                                </Button>
                            </div>
                            <p className="mt-3">{item}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
